"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon, Edit3, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import Webcam from 'react-webcam';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getInterviewDetails();
    }, []);

    const getInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));

            if (result.length > 0) {
                setInterviewData(result[0]);
            } else {
                console.log('Interview not found');
            }
        } catch (error) {
            console.log('Error fetching interview details: ', error);
            throw new Error(error.message);
        }
    };

    const handleEditDetails = async (updatedDetails) => {
        setLoading(true);
        try {
            await db.update(MockInterview)
                .set(updatedDetails)
                .where(eq(MockInterview.mockId, params.interviewId));

            // Generate new questions and answers based on the updated details
            const InputPrompt = `Job position: ${updatedDetails.jobPosition}, Job Description: ${updatedDetails.jobDesc}, Years of Experience: ${updatedDetails.jobExperience}. Provide 5-10 mixed technical and HR interview questions and answers in JSON format, with fields "question" and "answer". Do not write any additional thing than this`;

            const result = await chatSession.sendMessage(InputPrompt);
            const MockJsonResp = result.response.text().replace('```json', '').replace('```', '').trim();

            if (MockJsonResp) {
                await db.update(MockInterview)
                    .set({ jsonMockResp: MockJsonResp })
                    .where(eq(MockInterview.mockId, params.interviewId));
            } else {
                console.log("Error generating new questions");
            }

            // Update local state
            setInterviewData({ ...updatedDetails, jsonMockResp: MockJsonResp });
            setOpenEditDialog(false);
        } catch (error) {
            console.log('Error updating interview details: ', error);
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const openEditDialogHandler = () => {
        setOpenEditDialog(true);
    };

    return (
        <div className='p-12 bg-gray-100 min-h-screen text-gray-800 font-sans'>
            <h2 className='font-bold text-5xl mb-10 text-center text-blue-800'>Interview Details</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                <div className='flex flex-col gap-8 p-8 bg-white rounded-lg shadow-lg'>
                    <div className='relative'>
                        <Edit3 
                            className='absolute top-3 right-3 cursor-pointer text-blue-500 hover:text-blue-700'
                            onClick={openEditDialogHandler} 
                        />
                        <h2 className='text-2xl mb-4 font-semibold'><strong>Job Position:</strong> {interviewData?.jobPosition}</h2>
                        <h2 className='text-xl mb-4 font-medium'><strong>Job Description:</strong> {interviewData?.jobDesc}</h2>
                        <h2 className='text-xl mb-4 font-medium'><strong>Years of Experience:</strong> {interviewData?.jobExperience}</h2>
                    </div>
                    <div className='p-6 rounded-lg border-l-4 border-yellow-400 bg-yellow-50 text-yellow-700'>
                        <h2 className='flex items-center gap-2 text-xl font-semibold'><Lightbulb className='text-yellow-600' /> Information</h2>
                        <p className='mt-4 text-lg leading-relaxed'>{process.env.NEXT_PUBLIC_INFORMATION}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-8 items-center'>
                    {webCamEnabled ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 320,
                                width: 320,
                                borderRadius: '12px',
                                border: '3px solid #4A90E2',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            }}
                        />
                    ) : (
                        <div className='flex flex-col items-center bg-white p-8 rounded-lg shadow-lg'>
                            <WebcamIcon className='h-72 w-72 mb-6 p-4 border-2 border-dashed border-gray-300 bg-gray-100 rounded-lg' />
                            <Button variant="outline" className="w-full mt-4 text-blue-700 border-blue-700 hover:bg-blue-100" onClick={() => setWebCamEnabled(true)}>
                                Enable Web Cam and Microphone
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex justify-end mt-12'>
                <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                    <Button className='bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-lg shadow-lg'>
                        Start Interview
                    </Button>
                </Link>
            </div>

            <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                <DialogContent className='max-w-2xl bg-white text-gray-800 rounded-lg mx-2 overflow-y-auto max-h-[90vh] p-8 shadow-lg'>
                    <DialogHeader>
                        <DialogTitle className='text-3xl mb-6 text-blue-700'>Edit Interview Details</DialogTitle>
                        <DialogDescription>
                            {interviewData && (
                                <EditInterviewForm
                                    interviewData={interviewData}
                                    onSave={handleEditDetails}
                                    onClose={() => setOpenEditDialog(false)}
                                    loading={loading}
                                />
                            )}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function EditInterviewForm({ interviewData, onSave, onClose, loading }) {
    const [jobPosition, setJobPosition] = useState(interviewData?.jobPosition || '');
    const [jobDesc, setJobDesc] = useState(interviewData?.jobDesc || '');
    const [jobExperience, setJobExperience] = useState(interviewData?.jobExperience || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ jobPosition, jobDesc, jobExperience });
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Job Position</label>
                <Input 
                    className='mt-2 w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500' 
                    placeholder='Ex. Full Stack Developer' 
                    value={jobPosition} 
                    onChange={(e) => setJobPosition(e.target.value)} 
                />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Job Description/Tech Stack</label>
                <Textarea 
                    className='mt-2 w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500' 
                    placeholder='Ex. React, NextJs, NodeJs, MySQL etc.' 
                    value={jobDesc} 
                    onChange={(e) => setJobDesc(e.target.value)} 
                />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Years of Experience</label>
                <Input 
                    className='mt-2 w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500' 
                    placeholder='Ex. 5' 
                    type='number' 
                    value={jobExperience} 
                    onChange={(e) => setJobExperience(e.target.value)} 
                />
            </div>
            <div className='flex gap-4 justify-end'>
                <Button className='bg-gray-300 text-gray-700' type='button' variant='ghost' onClick={onClose}>
                    Cancel
                </Button>
                <Button className='bg-blue-700 hover:bg-blue-800 text-white' type='submit' disabled={loading}>
                    {loading ? (
                        <>
                            <LoaderCircle className='animate-spin' /> Updating Info...
                        </>
                    ) : 'Update'}
                </Button>
            </div>
        </form>
    );
}

export default Interview;
