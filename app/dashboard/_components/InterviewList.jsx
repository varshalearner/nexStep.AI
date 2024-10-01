"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db.select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));
    setInterviewList(result);
  };

  const handleDelete = (deleteId) => {
    setInterviewList(interviewList.filter(interview => interview.id !== deleteId));
  };

  return (
    <div className="p-2 bg-transparent">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Your Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {interviewList?.length > 0 ? (
          interviewList.map((interview) => (
            <InterviewItemCard
              interview={interview}
              key={interview.id}
              onDelete={handleDelete}
            />
          ))
        ) : (
          [1, 2, 3, 4].map((item, index) => (
            <div key={index} className="h-60 w-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse rounded-xl shadow-md">
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default InterviewList;
