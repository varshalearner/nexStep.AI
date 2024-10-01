"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Provide 5-10 mixed technical and HR interview questions and answers in JSON format, with fields "question" and "answer". Do not write any additional thing than this`;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response.text().replace('```json', '').replace('```', '').trim();

    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy')
        }).returning({ mockId: MockInterview.mockId });

      if (resp) {
        setOpenDialog(false);
        router.push('/dashboard/interview/' + resp[0]?.mockId);
      }
    } else {
      console.log("ERROR");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={() => setOpenDialog(true)}>
      <h2 className="text-2xl font-semibold text-gray-800 text-center">+ Add New Interview</h2>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-lg bg-white text-gray-800 rounded-lg p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-blue-700 mb-4">Create a New Interview</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Position</label>
                  <Input 
                    className="mt-2 w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    placeholder="e.g., Full Stack Developer" 
                    required
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Description/Tech Stack</label>
                  <Textarea 
                    className="mt-2 w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    placeholder="e.g., React, Node.js, MySQL" 
                    required
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                  <Input 
                    className="mt-2 w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    type="number" 
                    placeholder="e.g., 5" 
                    max="100" 
                    required
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)} 
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <Button className="bg-gray-300 hover:bg-gray-400 text-gray-700" type="button" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating...
                      </>
                    ) : 'Create Interview'}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
