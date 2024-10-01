"use client";
import React from 'react';
import { useUser } from '@clerk/nextjs';
import PerformanceOverview from './_components/PerformanceOverview';
import LeaderBoard from './_components/Leaderboard';
import StatsSummary from './_components/StatsSummary';

const QuizDashboard = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-xl font-semibold">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="ml-4">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg overflow-hidden text-gray-900">
        <div className="p-6 bg-gradient-to-br from-teal-100 to-blue-200 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Welcome, {user?.firstName}!</h1>
          <p className="mt-2 text-gray-600">Track your quiz performance and achievements</p>
        </div>

        {/* <div className="p-6">
          <StatsSummary />
        </div>

        <div className="p-6 ">
          <PerformanceOverview />
        </div> */}

        <div className="p-6">
          <LeaderBoard />
        </div>
      </div>
    </div>
  );
};

export default QuizDashboard;
