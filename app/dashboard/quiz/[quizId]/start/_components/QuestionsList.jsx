import React from 'react';
import { BsCircle, BsCheckCircleFill, BsEyeFill } from "react-icons/bs"; // Import eye icon for viewed questions
import { Button } from "@/components/ui/button";

function QuestionsList({ quizQuestions, activeQuestionIndex, userAnswers, viewedQuestions, setActiveQuestionIndex, handleSubmitQuiz }) {
  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Question List</h2>
      <div className="w-full grid grid-cols-2 gap-2">
        {quizQuestions.map((question, index) => (
          <button
            key={index}
            className={`p-2 border rounded-lg flex items-center gap-2 w-full ${activeQuestionIndex === index ? 'bg-indigo-300' : 'bg-white'} ${userAnswers[index] !== undefined ? 'border-green-400' : viewedQuestions.includes(index) ? 'border-yellow-400' : 'border-gray-300'}`}
            onClick={() => setActiveQuestionIndex(index)}
          >
            {userAnswers[index] !== undefined ? (
              <BsCheckCircleFill className="text-green-500" size={20} />
            ) : viewedQuestions.includes(index) ? (
              <BsEyeFill className="text-yellow-500" size={20} />
            ) : (
              <BsCircle className="text-gray-400" size={20} />
            )}
            <span className="text-gray-800 text-sm">Question {index + 1}</span>
          </button>
        ))}
      </div>
      <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-transform duration-300 transform hover:scale-105" onClick={handleSubmitQuiz}>
        Submit Quiz
      </Button>
    </div>
  );
}

export default QuestionsList;
