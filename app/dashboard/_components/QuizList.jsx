"use client";
import { db } from '@/utils/db';
import { MockQuiz } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuizItemCard from './QuizItemCard';

function QuizList() {
  const { user } = useUser();
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    user && GetQuizList();
  }, [user]);

  const GetQuizList = async () => {
    const result = await db.select()
      .from(MockQuiz)
      .where(eq(MockQuiz.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockQuiz.id));
    setQuizList(result);
  };

  const handleDelete = (deleteId) => {
    setQuizList(quizList.filter(quiz => quiz.id !== deleteId));
  };

  return (
    <div className="p-2 bg-transparent">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Your Previous Quizzes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {quizList?.length > 0 ? (
          quizList.map((quiz) => (
            <QuizItemCard
              quiz={quiz}
              key={quiz.id}
              onDelete={handleDelete}
            />
          ))
        ) : (
          [1, 2, 3, 4].map((item, index) => (
            <div key={index} className="h-60 w-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-xl shadow-md"></div>
          ))
        )}
      </div>
    </div>
  );
}

export default QuizList;
