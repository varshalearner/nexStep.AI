import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockQuiz, QuizAnswer } from '@/utils/schema';
import { FaTrophy, FaMedal, FaStar, FaFileExport } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [engagementData, setEngagementData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEngagementData = async () => {
    const quizAnswers = await db.select().from(QuizAnswer);
    const quizzes = await db.select().from(MockQuiz);

    if (quizAnswers.length > 0 && quizzes.length > 0) {
      const userAttendance = {};
      const userScores = {};

      quizAnswers.forEach(answer => {
        if (!userAttendance[answer.createdBy]) {
          userAttendance[answer.createdBy] = 0;
          userScores[answer.createdBy] = { totalScore: 0, totalQuizzes: 0, highestScore: 0, lowestScore: 100 };
        }
        userAttendance[answer.createdBy] += 1;

        const answers = answer.answers;
        const totalQuestions = answers.length;
        const correctAnswers = answers.filter(ans => ans.correctOption === ans.userAns).length;
        const score = (correctAnswers / totalQuestions) * 100;

        userScores[answer.createdBy].totalScore += score;
        userScores[answer.createdBy].totalQuizzes += 1;
        userScores[answer.createdBy].highestScore = Math.max(userScores[answer.createdBy].highestScore, score);
        userScores[answer.createdBy].lowestScore = Math.min(userScores[answer.createdBy].lowestScore, score);
      });

      const engagementData = Object.keys(userAttendance).map(user => ({
        user,
        attendance: userAttendance[user],
        averageScore: userScores[user].totalQuizzes > 0 ? (userScores[user].totalScore / userScores[user].totalQuizzes) : 0,
        totalQuizzes: userScores[user].totalQuizzes,
        highestScore: userScores[user].highestScore,
        lowestScore: userScores[user].lowestScore,
      }));

      return engagementData;
    }

    return [];
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEngagementData();
      setEngagementData(data);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-xl font-semibold">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="ml-4">Loading...</span>
      </div>
    );
  }

  if (engagementData.length === 0) {
    return <div className="text-center text-gray-500">No engagement data available</div>;
  }

  return (
    <div className='p-6'>
      <motion.div
        className='mb-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            <FaTrophy className="inline-block mr-2 text-yellow-500" /> Leaderboard
          </h2>
          <button
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
            onClick={() => alert('Export feature coming soon!')}
          >
            <FaFileExport className="mr-2" />
            Export Data
          </button>
        </div>
        <div className="overflow-x-auto">
          <motion.table
            className="min-w-full divide-y divide-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <thead className="bg-gradient-to-br from-teal-100 to-blue-200 text-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Avg. Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Quizzes</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Highest Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Lowest Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {engagementData.map((user, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.attendance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.averageScore.toFixed(2)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.totalQuizzes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.highestScore.toFixed(2)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lowestScore.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
