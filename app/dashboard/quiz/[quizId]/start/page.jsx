"use client";
import { db } from "@/utils/db";
import { MockQuiz, QuizAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from '@clerk/nextjs';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { RadioGroup } from '@headlessui/react';
import QuestionsList from "./_components/QuestionsList";
import { toast } from 'sonner'; // Import toast

function StartQuiz({ params }) {
  const [quizData, setQuizData] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [viewedQuestions, setViewedQuestions] = useState([]);
  const [quizTimer, setQuizTimer] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const result = await db.select().from(MockQuiz).where(eq(MockQuiz.quizId, params.quizId));

        if (result.length > 0) {
          setQuizData(result[0]);
          const questions = JSON.parse(result[0]?.jsonMockResp || '[]');
          setQuizQuestions(questions);
          setQuizTimer(5 * 60); // Set timer to 5 minutes (300 seconds)
        } else {
          console.log('Quiz not found');
        }
      } catch (error) {
        console.log('Error fetching quiz details: ', error);
      }
    };

    fetchQuizData();
  }, [params.quizId]);

  useEffect(() => {
    if (quizTimer > 0) {
      const timer = setInterval(() => {
        setQuizTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitQuiz(); // Submit quiz when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizTimer]);

  useEffect(() => {
    if (activeQuestionIndex !== null) {
      // Ensure the current question is added to the viewedQuestions list
      if (!viewedQuestions.includes(activeQuestionIndex)) {
        setViewedQuestions(prev => [...prev, activeQuestionIndex]);
      }
    }
  }, [activeQuestionIndex]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = answerIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setActiveQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setActiveQuestionIndex(prevIndex => prevIndex - 1);
  };

  const handleQuestionClick = (index) => {
    setActiveQuestionIndex(index);
  };

  const handleSubmitQuiz = async () => {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true); // Set submitting state to true

    try {
      if (!quizData || quizQuestions.length === 0) {
        console.log("Quiz data is not available or no questions found.");
        return;
      }

      const quizAnswers = {
        quizIdRef: quizData.quizId,
        answers: quizQuestions.map((question, index) => ({
          question: question.question,
          options: question.options,
          correctOption: question.correctOption,
          explanation: question.explanation,
          userAns: userAnswers[index] !== undefined ? userAnswers[index] : null,
        })),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date().toISOString(),
      };

      console.log("Quiz answers to submit: ", quizAnswers);

      if (quizAnswers.answers.length === 0) {
        console.log("No answers to submit.");
        return;
      }

      const existingEntry = await db.select().from(QuizAnswer).where(eq(QuizAnswer.quizIdRef, quizData.quizId));
      if (existingEntry.length > 0) {
        await db.update(QuizAnswer).set(quizAnswers).where(eq(QuizAnswer.quizIdRef, quizData.quizId));
      } else {
        await db.insert(QuizAnswer).values(quizAnswers);
      }

      console.log("Quiz answers submitted successfully");
      toast.success('Quiz submitted successfully!'); // Show success toast
      router.replace(`/dashboard/quiz/${quizData.quizId}/feedback`);
    } catch (error) {
      console.log('Error submitting quiz answers: ', error);
      toast.error('Error submitting quiz'); // Show error toast on catch
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden ring-1 ring-gray-900/10 animate-fadeIn grid grid-cols-1 md:grid-cols-3">

        {/* Timer Section */}
        <div className="flex flex-col items-center justify-between p-4 border-b md:border-b-0 md:border-r border-gray-200 bg-indigo-200 md:col-span-1 rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl">
          <div className="flex items-center gap-2 text-gray-800 mb-4">
            <FaRegClock className="text-indigo-600 animate-pulse" size={24} />
            <span className="text-2xl font-bold">
              {Math.floor(quizTimer / 60)}:{quizTimer % 60 < 10 ? '0' : ''}{quizTimer % 60}
            </span>
          </div>
          <QuestionsList
            quizQuestions={quizQuestions}
            activeQuestionIndex={activeQuestionIndex}
            userAnswers={userAnswers}
            viewedQuestions={viewedQuestions} // Pass the viewed questions
            setActiveQuestionIndex={handleQuestionClick} // Pass the updated function
            handleSubmitQuiz={handleSubmitQuiz}
          />
        </div>

        {/* Quiz Content */}
        <div className="md:col-span-2 p-6">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">{quizData?.title}</h1>
          {quizQuestions.length > 0 ? (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">{quizQuestions[activeQuestionIndex]?.question}</h3>
                <RadioGroup
                  value={userAnswers[activeQuestionIndex] ?? null}
                  onChange={(index) => handleAnswerSelect(activeQuestionIndex, index)}
                >
                  <div className="space-y-4">
                    {quizQuestions[activeQuestionIndex]?.options.map((option, index) => (
                      <RadioGroup.Option
                        key={index}
                        value={index}
                        className={({ active, checked }) =>
                          `relative flex items-center p-5 border rounded-xl cursor-pointer transition-transform duration-300 ease-in-out ${checked ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'bg-white text-gray-800 border-gray-300'} shadow-lg transform ${active ? 'scale-105' : ''}`
                        }
                      >
                        {({ checked }) => (
                          <>
                            <span className={`absolute left-5 text-2xl ${checked ? 'text-white' : 'text-gray-800'}`}>
                              {checked ? <BsFillArrowRightCircleFill size={24} /> : <BsFillArrowLeftCircleFill size={24} />}
                            </span>
                            <span className="pl-10">{option}</span>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-indigo-200 rounded-b-2xl">
                {activeQuestionIndex > 0 && (
                  <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md transition-transform duration-300 transform hover:scale-105" onClick={handlePreviousQuestion}>
                    <BsFillArrowLeftCircleFill size={20} />
                    Previous
                  </Button>
                )}
                <Button className='flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md transition-transform duration-300 transform hover:scale-105' 
                  onClick={activeQuestionIndex < quizQuestions.length - 1 ? handleNextQuestion : handleSubmitQuiz}
                >
                  {activeQuestionIndex < quizQuestions.length - 1 ? 'Next' : 'Finish'}
                  {activeQuestionIndex < quizQuestions.length - 1 ? 
                    <BsFillArrowRightCircleFill size={20} /> : 
                    <AiOutlineCheckCircle size={20} />}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600">Loading questions...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartQuiz;
