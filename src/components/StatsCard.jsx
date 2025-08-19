// components/StatsCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

const StatsCard = ({ title, value, change, trend, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold mt-2 mb-1">{value}</p>
          <div className="flex items-center gap-1">
            {trend === 'up' && <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />}
            {trend === 'down' && <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />}
            <p className="text-sm text-gray-500">{change}</p>
          </div>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color} bg-opacity-10`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;