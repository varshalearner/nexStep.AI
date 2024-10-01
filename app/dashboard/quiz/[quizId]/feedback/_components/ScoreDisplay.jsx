import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';

const ScoreDisplay = ({ score, correctAnswers, totalQuestions }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (score >= 50) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 7000); // Hide confetti after 7 seconds
      return () => clearTimeout(timer);
    }
  }, [score]);

  return (
    <motion.div
      className='relative bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-xl shadow-2xl text-center overflow-hidden'
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring', damping: 10 }}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false}
        />
      )}
      <motion.div
        className='absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6'
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Trophy className={`h-5 w-5 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 ${score >= 50 ? 'text-yellow-500' : 'text-yellow-700'}`} />
      </motion.div>
      <div className='relative z-10'>
        <h2 className='text-1xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4'>
          {score >= 50 ? (
            <span className='bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text'>
              Congratulations!
            </span>
          ) : (
            <span className='bg-gradient-to-r from-red-400 to-yellow-500 text-transparent bg-clip-text'>
              Try Again!
            </span>
          )}
        </h2>
        <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2'>
          Your Score: <span className='font-extrabold text-gray-900'>{score.toFixed(2)}% ({correctAnswers}/{totalQuestions})</span>
        </p>
        <p className='mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-gray-800'>
          {score >= 50
            ? 'Fantastic job! Keep up the great work and review the feedback below to continue improving.'
            : 'Don’t be discouraged! Review the feedback below to see where you can improve and try again.'}
        </p>
      </div>
      <div className='absolute bottom-0 left-0 w-full flex justify-center items-center'>
        <Star className='h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-yellow-500 opacity-70 animate-pulse' />
      </div>
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-400 opacity-20'
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
      />
      <div className='absolute inset-0 flex justify-center items-center pointer-events-none'>
        <Sparkles className='h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-yellow-300 opacity-80 animate-pulse' />
      </div>
    </motion.div>
  );
};

export default ScoreDisplay;
