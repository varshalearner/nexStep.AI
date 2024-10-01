import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { db } from '@/utils/db';
import { MockQuiz } from '@/utils/schema';
import { MdOutlineDelete } from "react-icons/md";
import { eq } from 'drizzle-orm';
import ConfirmationModal from './ConfirmationModal';
import { toast } from 'sonner'; // Import toast

function QuizItemCard({ quiz, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const onStart = () => {
    router.push('/dashboard/quiz/' + quiz?.quizId);
  };

  const onFeedbackPress = () => {
    router.push('/dashboard/quiz/' + quiz.quizId + "/feedback");
  };

  const onDeleteClick = async () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleConfirm = async () => {
    try {
      const deleteResult = await db.delete(MockQuiz)
        .where(eq(MockQuiz.quizId, quiz.quizId))
        .execute();

      if (deleteResult) {
        onDelete(quiz.id); // Call the onDelete function passed as a prop
        toast.success('Quiz deleted successfully'); // Show success toast
      } else {
        toast.error('Failed to delete quiz'); // Show error toast if deletion fails
      }
    } catch (error) {
      console.error('Error deleting quiz: ', error);
      toast.error('Error deleting quiz'); // Show error toast on catch
    } finally {
      setIsModalOpen(false); // Close the modal after action
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal without action
  };

  return (
    <div className="relative p-6 bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 rounded-lg shadow-lg text-gray-800 overflow-hidden">
      <div className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-500 hover:text-red-600 transition-colors duration-300 transform hover:scale-105" onClick={onDeleteClick}>
        <MdOutlineDelete />
      </div>

      <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{quiz?.title}</h2>
      <p className="text-lg text-gray-700 mb-1">{quiz?.description}</p>
      <p className="text-sm text-gray-600 mb-4">Created At: {quiz?.createdAt}</p>

      <div className="flex justify-between gap-4 mt-4">
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300 rounded-lg shadow-md" 
          onClick={onFeedbackPress}
        >
          Feedback
        </Button>
        <Button 
          size="sm" 
          className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-300 rounded-lg shadow-md" 
          onClick={onStart}
        >
          Start
        </Button>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default QuizItemCard;
