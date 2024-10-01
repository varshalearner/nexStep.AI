import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { MdOutlineDelete } from "react-icons/md";
import { eq } from 'drizzle-orm';

function InterviewItemCard({ interview, onDelete }) {
  const router = useRouter();

  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push('/dashboard/interview/' + interview.mockId + "/feedback");
  };

  const onDeleteClick = async () => {
    try {
      const deleteResult = await db.delete(MockInterview)
        .where(eq(MockInterview.mockId, interview.mockId))
        .execute();

      if (deleteResult) {
        onDelete(interview.id); // call the onDelete function passed as a prop
      } else {
        console.error('Failed to delete interview');
      }
    } catch (error) {
      console.error('Error deleting interview: ', error);
    }
  };

  return (
    <div className="relative p-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-lg text-gray-800 overflow-hidden">
      <div className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-500 hover:text-red-600 transition-colors duration-300 transform hover:scale-105" onClick={onDeleteClick}>
        <MdOutlineDelete />
      </div>

      <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{interview?.jobPosition}</h2>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{interview?.jobExperience} Years of Experience</h3>
      <p className="text-sm text-gray-600 mb-4">Created At: {interview?.createdAt}</p>

      <div className="flex justify-between gap-4 mt-4">
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300 rounded-lg shadow-md" 
          onClick={onFeedbackPress}
        >
          Feedback
        </Button>
        <Button 
          size="sm" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 rounded-lg shadow-md" 
          onClick={onStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
