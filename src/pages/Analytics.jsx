// pages/Analytics.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');

  const spendingData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Spending',
        data: [650, 590, 800, 810, 560, 550, 740],
        fill: true,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const categoryData = {
    labels: ['Vegetables', 'Dairy', 'Grains', 'Fruits', 'Oil & Ghee', 'Others'],
    datasets: [
      {
        data: [30, 25, 20, 15, 7, 3],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(147, 51, 234, 0.8)',
        ],
      },
    ],
  };

  const topItems = [
    { name: 'Tomatoes', quantity: '42 kg', change: '+12%', trend: 'up' },
    { name: 'Milk', quantity: '60 L', change: '+8%', trend: 'up' },
    { name: 'Rice', quantity: '35 kg', change: '-5%', trend: 'down' },
    { name: 'Onions', quantity: '28 kg', change: '+15%', trend: 'up' },
    { name: 'Cooking Oil', quantity: '12 L', change: '0%', trend: 'neutral' },
  ];

  const insights = [
    { title: 'Best Saving Day', value: 'Wednesday', description: 'You saved ₹120 by smart ordering' },
    { title: 'Peak Order Time', value: '10-11 AM', description: 'Most of your orders are delivered' },
    { title: 'Avg. Order Value', value: '₹685', description: 'Per day average spending' },
    { title: 'Return Rate', value: '2.3%', description: 'Very low return rate' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your spending and usage patterns</p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</h3>
            <CurrencyRupeeIcon className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold">₹4,795</p>
          <p className="text-sm text-green-500 mt-1">-12% from last week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Orders</h3>
            <ChartBarIcon className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold">7</p>
          <p className="text-sm text-gray-500 mt-1">This week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Daily</h3>
            <CalendarIcon className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold">₹685</p>
          <p className="text-sm text-gray-500 mt-1">Per day</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Saved</h3>
            <ArrowTrendingUpIcon className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold">₹580</p>
          <p className="text-sm text-green-500 mt-1">Through smart ordering</p>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Trend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Spending Trend</h2>
          <div className="h-64">
            <Line 
              data={spendingData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return '₹' + value;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
          <div className="h-64">
            <Doughnut 
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 10,
                      font: {
                        size: 11
                      }
                    }
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Top Items & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Items */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Top Ordered Items</h2>
          <div className="space-y-3">
            {topItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.quantity} this week</p>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {item.trend === 'up' && <ArrowTrendingUpIcon className="w-4 h-4" />}
                  {item.trend === 'down' && <ArrowTrendingDownIcon className="w-4 h-4" />}
                  {item.change}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Key Insights</h2>
          <div className="grid grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{insight.title}</p>
                <p className="text-xl font-bold mb-1">{insight.value}</p>
                <p className="text-xs text-gray-500">{insight.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;