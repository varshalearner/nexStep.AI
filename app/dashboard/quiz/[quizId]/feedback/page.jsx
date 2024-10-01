"use client";
import { db } from '@/utils/db';
import { QuizAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import ScoreDisplay from './_components/ScoreDisplay';
import { CheckCircle, XCircle } from 'lucide-react';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db.select()
      .from(QuizAnswer)
      .where(eq(QuizAnswer.quizIdRef, params.quizId))
      .orderBy(QuizAnswer.id);

    if (result.length > 0) {
      const answers = result[0].answers;
      setFeedbackList(answers);

      // Calculate score
      const correct = answers.filter(answer => answer.correctOption === answer.userAns).length;
      const total = answers.length;
      setCorrectAnswers(correct);
      setTotalQuestions(total);
      setScore((correct / total) * 100);
    }
  };

  return (
    <div className='p-10 bg-gray-100 min-h-screen'>
      {feedbackList?.length === 0 ? (
        <h2 className='font-bold text-xl text-gray-500'>
          No Quiz Feedback Record Found
        </h2>
      ) : (
        <>
          <ScoreDisplay score={score} correctAnswers={correctAnswers} totalQuestions={totalQuestions} />

          {feedbackList && feedbackList.map((item, index) => (
            <div key={index} className='mt-7 p-5 bg-white border border-gray-200 rounded-lg shadow-md'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-medium text-gray-800'>{index + 1}. {item.question}</h3>
                {item.correctOption === item.userAns ? (
                  <CheckCircle className='h-6 w-6 text-green-500' />
                ) : (
                  <XCircle className='h-6 w-6 text-red-500' />
                )}
              </div>
              <div className='space-y-2 mt-3'>
                {item.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`p-2 rounded-lg border ${item.userAns === optIndex
                        ? item.correctOption === optIndex
                          ? 'bg-green-100 border-green-300 text-green-900'
                          : 'bg-red-100 border-red-300 text-red-900'
                        : 'border-gray-300 text-gray-900'
                      } ${item.correctOption === optIndex && item.userAns !== optIndex
                        ? 'bg-green-100 border-green-300 text-green-900'
                        : ''
                      }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
              <h2 className='mt-3 text-sm text-gray-700'>
                <strong>Explanation: </strong>
                <span className='block bg-blue-100 border border-blue-300 p-2 rounded-lg text-blue-900'>{item.explanation}</span>
              </h2>
            </div>
          ))}

          <div className='mt-10'>
            <Button onClick={() => router.replace('/dashboard')} className='bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600'>
              Go Home
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Feedback;