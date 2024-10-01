"use client";
import { Lightbulb, Volume2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function QuestionsSection({
  mockInterviewQuestion = [],
  activeQuestionIndex = 0,
  setActiveQuestionIndex = () => {},
  answeredQuestions = [],
  setAnsweredQuestions = () => {}
}) {
  const [visitedQuestions, setVisitedQuestions] = useState([]);

  useEffect(() => {
    if (activeQuestionIndex !== null && !visitedQuestions.includes(activeQuestionIndex)) {
      setVisitedQuestions([...visitedQuestions, activeQuestionIndex]);
    }
  }, [activeQuestionIndex]);

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text to speech');
    }
  };

  const handleQuestionClick = (index) => {
    setActiveQuestionIndex(index);
  };

  return mockInterviewQuestion.length > 0 && (
    <div className='p-6 bg-white shadow-xl rounded-lg'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {mockInterviewQuestion.map((question, index) => (
          <div
            key={index}
            onClick={() => handleQuestionClick(index)}
            className={`p-3 border rounded-lg text-xs md:text-sm text-center cursor-pointer transition duration-300
              ${activeQuestionIndex === index ? 'bg-teal-500 text-white' : 
                answeredQuestions.includes(index) ? 'bg-green-500 text-white' : 
                visitedQuestions.includes(index) ? 'bg-yellow-400 text-white' : 'bg-gray-100'}`}
          >
            Question #{index + 1}
          </div>
        ))}
      </div>
      <h2 className='my-5 text-lg font-semibold'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
      <Volume2 
        className='cursor-pointer text-blue-600 hover:text-blue-800' 
        onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)} 
      />
      
      {/* Next Public Question Note Section */}
      <div className='border rounded-lg p-4 bg-blue-50 mt-8'>
        <h2 className='flex gap-2 items-center text-blue-700 text-sm'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <p className='text-blue-600'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</p>
      </div>
    </div>
  );
}

export default QuestionsSection;
