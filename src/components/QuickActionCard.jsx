// components/QuickActionCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const QuickActionCard = ({ title, description, path, icon: Icon, color }) => {
  return (
    <Link to={path}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="h-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
      >
        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${color} mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
          <span>Get Started</span>
          <ArrowRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>
    </Link>
  );
};

export default QuickActionCard;