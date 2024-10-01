"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  }

  const handleQuestionAnswered = (index) => {
    if (!answeredQuestions.includes(index)) {
      setAnsweredQuestions([...answeredQuestions, index]);
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900'>
      <div className='container mx-auto p-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* Questions */}
          <QuestionsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            setActiveQuestionIndex={setActiveQuestionIndex}
            answeredQuestions={answeredQuestions}
            setAnsweredQuestions={setAnsweredQuestions}
          />

          {/* Video/ Audio Recording */}
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            onAnswerRecorded={handleQuestionAnswered}
          />
        </div>
        <div className='flex justify-end gap-4 mt-8'>
          {activeQuestionIndex > 0 &&
            <Button variant="outline" onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous</Button>}
          {activeQuestionIndex !== mockInterviewQuestion.length - 1 &&
            <Button variant="outline" onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next</Button>}
          {activeQuestionIndex === mockInterviewQuestion.length - 1 &&
            <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
              <Button>Finish Interview</Button>
            </Link>}
        </div>
      </div>
    </div>
  )
}

export default StartInterview;
