"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
  }

  return (
    <div className='p-10 bg-gray-100 min-h-screen'>
      {feedbackList?.length === 0 ? (
        <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record Found</h2>
      ) : (
        <>
          <h2 className='text-4xl font-bold text-green-600 mb-4'>Congratulations!</h2>
          <h2 className='font-bold text-2xl text-gray-800 mb-2'>Here is your interview feedback</h2>
          <h2 className='text-sm text-gray-700 mb-4'>Find below the interview questions with the correct answers, your answers, and feedback for improvement.</h2>

          {feedbackList && feedbackList.map((item, index) => (
            <Collapsible key={index} className='mt-7'>
              <CollapsibleTrigger className='p-3 bg-gradient-to-br from-white via-teal-50 to-teal-100 border border-gray-200 text-gray-800 rounded-lg flex justify-between items-center my-2 text-left gap-7 w-full shadow-md'>
                <span className='text-lg'>{item.question}</span> 
                <ChevronsUpDown className='h-5 w-5' />
              </CollapsibleTrigger>
              <CollapsibleContent className='bg-white p-4 rounded-lg shadow-md'>
                <div className='flex flex-col gap-4'>
                  <h2 className='text-lg text-gray-800'><strong>Rating:</strong> {item.rating}</h2>
                  <h2 className='text-sm text-gray-700'><strong>Your Answer: </strong><span className='block bg-red-100 p-2 rounded-lg text-red-900'>{item.userAns}</span></h2>
                  <h2 className='text-sm text-gray-700'><strong>Correct Answer: </strong><span className='block bg-green-100 p-2 rounded-lg text-green-900'>{item.correctAns}</span></h2>
                  <h2 className='text-sm text-gray-700'><strong>Feedback: </strong><span className='block bg-blue-100 p-2 rounded-lg text-blue-900'>{item.feedback}</span></h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      
      <div className='mt-10'>
        <Button onClick={() => router.replace('/dashboard')} className='bg-blue-500 text-white p-3 rounded-lg shadow-md'>
          Go Home
        </Button>
      </div>
    </div>
  )
}

export default Feedback
