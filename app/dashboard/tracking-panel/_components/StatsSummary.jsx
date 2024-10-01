"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { QuizAnswer } from '@/utils/schema';
import { FaMedal, FaUserGraduate, FaTrophy, FaClipboardList, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import StatCard from './StatCard'; // Import the StatCard component

const useCountUp = (endValue, duration = 2) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);
      setCount(Math.min(Math.floor(endValue * progress), endValue));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [endValue, duration]);

  return count;
};

const StatsSummary = () => {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await db.select().from(QuizAnswer).orderBy(QuizAnswer.id);

        if (result.length > 0) {
          const answers = result.map(res => res.answers).flat();
          const totalQuestions = answers.length;
          const correctAnswers = answers.filter(answer => answer.correctOption === answer.userAns).length;
          const incorrectAnswers = totalQuestions - correctAnswers;

          setStats({
            totalQuizzes: result.length,
            totalQuestions,
            totalCorrect: correctAnswers,
            totalIncorrect: incorrectAnswers,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Ensure this hook only runs once

  // Use the counting hook for each stat value
  const totalQuizzes = useCountUp(stats.totalQuizzes);
  const totalQuestions = useCountUp(stats.totalQuestions);
  const totalCorrect = useCountUp(stats.totalCorrect);
  const totalIncorrect = useCountUp(stats.totalIncorrect);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-xl font-semibold">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="ml-4">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCard
        icon={<FaMedal className="text-6xl mx-auto text-yellow-500 transform transition-transform duration-300 hover:rotate-12" />}
        title="Total Quizzes"
        value={totalQuizzes}
        colors={['bg-gradient-to-r from-yellow-100 to-yellow-200', 'text-yellow-800', 'text-yellow-600']}
      />
      <StatCard
        icon={<FaClipboardList className="text-6xl mx-auto text-blue-500 transform transition-transform duration-300 hover:rotate-12" />}
        title="Total Questions"
        value={totalQuestions}
        colors={['bg-gradient-to-r from-blue-100 to-blue-200', 'text-blue-800', 'text-blue-600']}
      />
      <StatCard
        icon={<FaCheckCircle className="text-6xl mx-auto text-green-500 transform transition-transform duration-300 hover:rotate-12" />}
        title="Correct Answers"
        value={totalCorrect}
        colors={['bg-gradient-to-r from-green-100 to-green-200', 'text-green-800', 'text-green-600']}
      />
      <StatCard
        icon={<FaTimesCircle className="text-6xl mx-auto text-red-500 transform transition-transform duration-300 hover:rotate-12" />}
        title="Incorrect Answers"
        value={totalIncorrect}
        colors={['bg-gradient-to-r from-red-100 to-red-200', 'text-red-800', 'text-red-600']}
      />
    </div>
  );
};

export default StatsSummary;
