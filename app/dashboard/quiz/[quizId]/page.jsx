"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { Lightbulb, Edit3, LoaderCircle } from 'lucide-react';
import { MockQuiz } from '@/utils/schema';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';

function Quiz({ params }) {
    const [quizData, setQuizData] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getQuizDetails();
    }, []);

    const getQuizDetails = async () => {
        try {
            const result = await db.select().from(MockQuiz).where(eq(MockQuiz.quizId, params.quizId));
            if (result.length > 0) {
                setQuizData(result[0]);
            } else {
                console.log('Quiz not found');
            }
        } catch (error) {
            console.log('Error fetching quiz details: ', error);
            throw new Error(error.message);
        }
    };

    const handleEditDetails = async (updatedDetails) => {
        setLoading(true);
        try {
            await db.update(MockQuiz)
                .set(updatedDetails)
                .where(eq(MockQuiz.quizId, params.quizId));

            // Generate new questions and answers based on the updated details
            const InputPrompt = `Quiz name: ${updatedDetails.title}, Description: ${updatedDetails.description}, Job Position: ${updatedDetails.jobPosition}, Job Description: ${updatedDetails.jobDesc}, Years of Experience: ${updatedDetails.jobExperience}. Provide 20-30 multiple-choice questions with options and explanations in JSON format. Each question should include fields "question", "options" (array of options), "correctOption" (index of the correct option), and "explanation". Do not include additional text.`;

            const result = await chatSession.sendMessage(InputPrompt);
            const MockJsonResp = result.response.text().replace('```json', '').replace('```', '').trim();

            if (MockJsonResp) {
                await db.update(MockQuiz)
                    .set({ jsonMockResp: MockJsonResp })
                    .where(eq(MockQuiz.quizId, params.quizId));
            } else {
                console.log('Error generating new questions');
            }

            // update local state
            setQuizData({ ...updatedDetails, jsonMockResp: MockJsonResp });

            setOpenEditDialog(false);
        } catch (error) {
            console.log('Error updating quiz details: ', error);
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const openEditDialogHandler = () => {
        setOpenEditDialog(true);
    };

    return (
        <div className="p-12 bg-gray-100 min-h-screen text-gray-800 font-sans">
            <h2 className="font-bold text-5xl mb-12 text-center text-blue-700">Quiz Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="flex flex-col gap-8 p-8 bg-gray-50 rounded-lg shadow-lg">
                    <div className="relative">
                        <Edit3
                            className="absolute top-3 right-3 cursor-pointer text-blue-500 hover:text-blue-700"
                            onClick={openEditDialogHandler}
                        />
                        <h2 className="text-2xl mb-4 font-semibold"><strong>Quiz Title:</strong> {quizData?.title}</h2>
                        <h2 className="text-2xl mb-4 font-semibold"><strong>Description:</strong> {quizData?.description}</h2>
                        <h2 className="text-2xl mb-4 font-semibold"><strong>Job Role:</strong> {quizData?.jobPosition}</h2>
                        <h2 className="text-2xl mb-4 font-semibold"><strong>Tech Stack:</strong> {quizData?.jobDesc}</h2>
                        <h2 className="text-2xl font-semibold"><strong>Experience:</strong> {quizData?.jobExperience} years</h2>
                    </div>
                </div>
                <div className="flex flex-col gap-8 p-8 bg-yellow-50 rounded-lg border-l-4 border-yellow-400 shadow-lg">
                    <h2 className="flex items-center gap-2 text-2xl font-semibold text-yellow-600"><Lightbulb className="text-yellow-700" /> Information</h2>
                    <p className="mt-4 text-lg leading-relaxed">{process.env.NEXT_PUBLIC_QUIZ_INFORMATION}</p>
                </div>
            </div>
            <div className="flex justify-end mt-12">
                <Link href={`/dashboard/quiz/${params.quizId}/start`}>
                    <Button className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-lg shadow-md">Start Quiz</Button>
                </Link>
            </div>

            <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                <DialogContent className="max-w-2xl bg-white text-gray-800 rounded-lg mx-2 overflow-y-auto max-h-[90vh] p-8 shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-3xl mb-6 text-blue-700">Edit Quiz Details</DialogTitle>
                        <DialogDescription>
                            {quizData && (
                                <EditQuizForm
                                    quizData={quizData}
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

function EditQuizForm({ quizData, onSave, onClose, loading }) {
    const [title, setTitle] = useState(quizData?.title || '');
    const [description, setDescription] = useState(quizData?.description || '');
    const [jobPosition, setJobPosition] = useState(quizData?.jobPosition || '');
    const [jobDesc, setJobDesc] = useState(quizData?.jobDesc || '');
    const [jobExperience, setJobExperience] = useState(quizData?.jobExperience || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, description, jobPosition, jobDesc, jobExperience });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Quiz Title</label>
                <Input className="mt-2 w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500" placeholder="Ex. JavaScript Basics" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Quiz Description</label>
                <Input className="mt-2 w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500" placeholder="Ex. A quiz to practice JavaScript basics" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Job Role/Job Position</label>
                <Input className="mt-2 w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500" placeholder="Ex. JavaScript Developer" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Job Description/Tech Stack</label>
                <Textarea className="mt-2 w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500" placeholder="Ex. React, NextJs, NodeJs, MySQL etc." value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <Input className="mt-2 w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500" placeholder="Ex. 5" type="number" value={jobExperience} onChange={(e) => setJobExperience(e.target.value)} />
            </div>
            <div className="flex gap-4 justify-end">
                <Button className="bg-gray-300 text-gray-700" type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white" type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <LoaderCircle className="animate-spin" /> Updating Info...
                        </>
                    ) : 'Update'}
                </Button>
            </div>
        </form>
    );
}

export default Quiz;
