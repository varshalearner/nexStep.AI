"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockQuiz } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewQuiz() {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt = `Quiz name: ${title}, Description: ${description}, Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Provide 20-30 multiple-choice questions with options and explanations in JSON format. Each question should include fields "question", "options" (array of options), "correctOption" (index of the correct option), and "explanation". Do not include additional text.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = result.response.text().replace('```json', '').replace('```', '').trim(); // Trim here

      setJsonResponse(MockJsonResp);

      if (MockJsonResp) {
        const resp = await db.insert(MockQuiz)
          .values({
            mockId: uuidv4(),
            title: title,
            description: description,
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy'),
            quizId: uuidv4()
          }).returning({ quizId: MockQuiz.quizId });

        if (resp) {
          setOpenDialog(false);
          router.push('/dashboard/quiz/' + resp[0]?.quizId);
        } else {
          console.log("ERROR");
        }
      } else {
        console.log("Error generating quiz questions");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={() => setOpenDialog(true)}>
      <h2 className="text-2xl font-semibold text-gray-800 text-center">+ Add New Quiz</h2>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-white text-gray-800 rounded-lg mx-4 overflow-y-auto max-h-[90vh] shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-3xl mb-5 font-semibold text-blue-600">Create a New Quiz</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <Input 
                    className="mt-2 w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    placeholder="Ex. JavaScript Fundamentals" 
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <Textarea 
                    className="mt-2 w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    placeholder="Ex. A comprehensive quiz about JavaScript basics" 
                    required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Position</label>
                  <Input 
                    className="mt-2 w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    placeholder="Ex. Full Stack Developer" 
                    required
                    value={jobPosition}
                    onChange={(event) => setJobPosition(event.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Description/Tech Stack</label>
                  <Textarea 
                    className="mt-2 w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    placeholder="Ex. React, NextJs, NodeJs, MySQL" 
                    required
                    value={jobDesc}
                    onChange={(event) => setJobDesc(event.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                  <Input 
                    className="mt-2 w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                    placeholder="Ex. 5" 
                    type="number" 
                    max="100" 
                    required
                    value={jobExperience}
                    onChange={(event) => setJobExperience(event.target.value)}
                  />
                </div>
                <div className="flex gap-4 justify-end mt-6">
                  <Button className="bg-gray-300 hover:bg-gray-400 text-gray-700" type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating...
                      </>
                    ) : 'Add Quiz'}
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

export default AddNewQuiz;
