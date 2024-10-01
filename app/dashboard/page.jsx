"use client";
import React, { useState, useEffect } from 'react';
import AddNewInterview from './_components/AddNewInterview';
import AddNewQuiz from './_components/AddNewQuiz';
import InterviewList from './_components/InterviewList';
import QuizList from './_components/QuizList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function Dashboard() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // retrieve the last active tab index from localStorage
    const savedIndex = localStorage.getItem('selectedTabIndex');
    if (savedIndex != null) {
      setSelectedIndex(Number(savedIndex));
    }
  }, []);

  const handleTabSelect = (index) => {
    // save the active tab index to localStorage
    localStorage.setItem('selectedTabIndex', index);
    setSelectedIndex(index);
  }

  return (
    <div className="p-6 md:p-12 bg-gray-100 min-h-screen text-gray-900 font-sans">
      <header className="mb-10">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-lg text-gray-600">Manage your Mock Interviews and Quizzes with a touch of elegance.</p>
      </header>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <Tabs selectedIndex={selectedIndex} onSelect={handleTabSelect}>
          <TabList className='flex border-b border-gray-300 bg-gray-200'>
            <Tab className={`py-3 px-6 text-lg font-semibold cursor-pointer transition-colors duration-300 rounded-t-lg ${selectedIndex === 0 ? 'bg-blue-500 text-white border-b-4 border-blue-700 shadow-md' : 'text-blue-600 hover:bg-blue-50'}`}>
              Interviews
            </Tab>
            <Tab className={`py-3 px-6 text-lg font-semibold cursor-pointer transition-colors duration-300 rounded-t-lg ${selectedIndex === 1 ? 'bg-green-500 text-white border-b-4 border-green-700 shadow-md' : 'text-green-600 hover:bg-green-50'}`}>
              Quizzes
            </Tab>
          </TabList>

          <TabPanel className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6'>
              <AddNewInterview />
            </div>
            <InterviewList />
          </TabPanel>

          <TabPanel className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6'>
              <AddNewQuiz />
            </div>
            <QuizList />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
