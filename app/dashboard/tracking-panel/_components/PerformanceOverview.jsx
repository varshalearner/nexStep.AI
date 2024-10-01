import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Radar, Pie } from 'react-chartjs-2';
import { db } from '@/utils/db';
import { MockQuiz, QuizAnswer } from '@/utils/schema';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaPercentage, FaFileExport, FaBoxOpen, FaBrain, FaUserMd, FaUserGraduate } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import BeatLoader from 'react-spinners/BeatLoader';
import StatsSummary from './StatsSummary';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Title, Tooltip, Legend);

const PerformanceOverview = () => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch quiz data function
  const fetchQuizData = async () => {
    try {
      const quizResults = await db.select().from(QuizAnswer).orderBy(QuizAnswer.createdAt);
      const quizDetails = await db.select().from(MockQuiz);

      if (quizResults.length > 0) {
        const processedData = quizResults.map(res => {
          const quizDetail = quizDetails.find(quiz => quiz.quizId === res.quizIdRef);
          if (!quizDetail) {
            return null;
          }
          const answers = res.answers;
          const totalQuestions = answers.length;
          const correctAnswers = answers.filter(answer => answer.correctOption === answer.userAns).length;

          return {
            quizTitle: quizDetail.title,
            createdAt: res.createdAt,
            correctAnswers,
            totalQuestions,
            score: (correctAnswers / totalQuestions) * 100,
          };
        }).filter(data => data !== null);

        return processedData;
      }

      return [];
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      setError(true);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchQuizData();
      setQuizData(data);
      setLoading(false);
    };

    loadData();
  }, []);

  const exportDataAsCSV = () => {
    const csvData = quizData.map(quiz => ({
      Title: quiz.quizTitle,
      Date: new Date(quiz.createdAt).toLocaleDateString(),
      'Correct Answers': quiz.correctAnswers,
      'Total Questions': quiz.totalQuestions,
      Score: quiz.score.toFixed(2),
    }));

    const csvContent = [
      ['Title', 'Date', 'Correct Answers', 'Total Questions', 'Score'],
      ...csvData.map(quiz => Object.values(quiz))
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'quiz_performance.csv');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-xl font-semibold">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="ml-4">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Failed to load quiz data</div>;
  }

  if (quizData.length === 0) {
    return <div className="text-center text-gray-500 mt-10">No quiz data available</div>;
  }

  // Calculate stats
  const totalQuizzes = quizData.length;
  const averageScore = quizData.reduce((acc, quiz) => acc + quiz.score, 0) / totalQuizzes;
  const averageCorrectAnswers = quizData.reduce((acc, quiz) => acc + quiz.correctAnswers, 0) / totalQuizzes;
  const averageTotalQuestions = quizData.reduce((acc, quiz) => acc + quiz.totalQuestions, 0) / totalQuizzes;

  const labels = quizData.map(q => new Date(q.createdAt).toLocaleDateString());
  const scores = quizData.map(q => q.score);
  const correctAnswers = quizData.map(q => q.correctAnswers);
  const totalQuestions = quizData.map(q => q.totalQuestions);

  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Scores (%)',
        data: scores,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
        tension: 0.4,
      }
    ],
  };

  const barChartData = {
    labels,
    datasets: [
      {
        label: 'Correct Answers',
        data: correctAnswers,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: 'Total Questions',
        data: totalQuestions,
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const radarChartData = {
    labels: ['Average Score', 'Average Correct Answers', 'Average Total Questions'],
    datasets: [
      {
        label: 'Quiz Performance',
        data: [averageScore, averageCorrectAnswers, averageTotalQuestions],
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  const pieChartData = {
    labels: ['Correct Answers', 'Incorrect Answers'],
    datasets: [
      {
        data: [
          quizData.reduce((acc, quiz) => acc + quiz.correctAnswers, 0),
          quizData.reduce((acc, quiz) => acc + quiz.totalQuestions - quiz.correctAnswers, 0),
        ],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const renderPerformanceTrend = () => {
    const trend = scores[scores.length - 1] - scores[0];
    if (trend > 0) {
      return <span className="text-green-500">Improving</span>;
    } else if (trend < 0) {
      return <span className="text-red-500">Declining</span>;
    } else {
      return <span className="text-gray-500">Stable</span>;
    }
  };

  return (
    <div className="p-6">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            <FaUserGraduate className="inline-block mr-2 text-green-500" /> Performance Overview
          </h2>
          <button
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
            onClick={exportDataAsCSV}
          >
            <FaFileExport className="mr-2" />
            Export Data
          </button>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
          
          <motion.div
            className="p-4 bg-white shadow-lg rounded-md"
          >
            <h3 className="text-lg font-medium mb-2">Performance Trends</h3>
            <Line data={lineChartData} options={options} />
          </motion.div>
          <motion.div
            className="p-4 bg-white shadow-lg rounded-md"
          >
            <h3 className="text-lg font-medium mb-2">Quiz Statistics</h3>
            <Bar data={barChartData} options={options} />
          </motion.div>
          <motion.div
            className="p-4 bg-white shadow-lg rounded-md"
          >
            <h3 className="text-lg font-medium mb-2">Strengths & Weaknesses</h3>
            <Radar data={radarChartData} options={options} />
          </motion.div>
          <motion.div
            className="p-4 bg-white shadow-lg rounded-md"
          >
            <h3 className="text-lg font-medium mb-2">Overall Performance</h3>
            <Pie data={pieChartData} options={options} />
          </motion.div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-lg font-medium">Your performance trend is: {renderPerformanceTrend()}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceOverview;
