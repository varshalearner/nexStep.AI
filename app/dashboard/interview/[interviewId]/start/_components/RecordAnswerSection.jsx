"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData, onAnswerRecorded }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results?.forEach(result => {
      setUserAnswer(prevAns => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer, isRecording]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, Depends on question and user answer for give interview question, please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
    const JsonFeedbackResp = JSON.parse(mockJsonResp);
    const resp = await db.insert(UserAnswer)
      .values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy')
      });

    if (resp) {
      toast.success('User answer recorded successfully');
      setUserAnswer('');
      setResults([]);
      onAnswerRecorded(activeQuestionIndex); // Callback to mark the question as answered
    }
    setResults([]);
    setLoading(false);
  };

  return (
    <div className='flex flex-col items-center p-6 bg-white shadow-xl rounded-lg'>
      <div className='relative w-full max-w-md'>
        <Image src={'/webcam.png'} width={300} height={300} className='absolute inset-0' alt='Webcam Placeholder' />
        <Webcam
          mirrored={true}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: '8px',
            border: '2px solid #ddd',
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-8"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className='text-red-600 flex gap-2 items-center'>
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className='text-blue-700 flex gap-2 items-center'>
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;

