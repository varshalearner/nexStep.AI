// components/StatCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon, title, value, colors }) => {
  const [bgColor, textColorTitle, textColorCount] = colors;

  return (
    <motion.div
      className={`text-center p-6 rounded-lg shadow-xl ${bgColor} text-white`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
    >
      {icon}
      <p className={`text-xl font-semibold mt-4 ${textColorTitle}`}>{title}</p>
      <motion.p
        className={`text-4xl font-extrabold mt-2 ${textColorCount}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
};

export default StatCard;
