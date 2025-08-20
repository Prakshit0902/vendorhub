// pages/Dashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  TruckIcon, 
  CurrencyRupeeIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ChartBarIcon,
  SparklesIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import StatsCard from '../components/StatsCard';
import QuickActionCard from '../components/QuickActionCard';
import RecentOrders from '../components/RecentOrders';
import UpcomingDeliveries from '../components/UpcomingDeliveries';

const stats = [
  {
    title: "Today's Orders",
    value: "12",
    change: "+2 from yesterday",
    trend: "up",
    icon: ShoppingCartIcon,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Pending Deliveries",
    value: "3",
    change: "Expected by 2 PM",
    trend: "neutral",
    icon: TruckIcon,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "This Month",
    value: "₹24,580",
    change: "+12% from last month",
    trend: "up",
    icon: CurrencyRupeeIcon,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Items Saved",
    value: "₹3,200",
    change: "Through smart ordering",
    trend: "up",
    icon: ArrowTrendingUpIcon,
    color: "from-orange-500 to-red-500",
  },
];

const quickActions = [
  { 
    title: "Set Daily Needs", 
    description: "Configure your recurring orders",
    path: "/daily-needs", 
    icon: ShoppingCartIcon,
    color: "from-blue-500 to-cyan-500"
  },
  { 
    title: "Add Extra Items", 
    description: "Add items for specific days",
    path: "/add-extra", 
    icon: PlusIcon,
    color: "from-green-500 to-emerald-500"
  },
  { 
    title: "View Analytics", 
    description: "Track your spending patterns",
    path: "/analytics", 
    icon: ChartBarIcon,
    color: "from-purple-500 to-pink-500"
  },
  { 
    title: "Today's Summary", 
    description: "Check today's order status",
    path: "/order-summary", 
    icon: ClockIcon,
    color: "from-orange-500 to-amber-500"
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white"
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
          <SparklesIcon className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Good Morning, Vendor! 👋</h1>
          <p className="text-blue-100 mb-4">Your smart delivery assistant is ready to help you today.</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/daily-needs"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Quick Order
            </Link>
            <Link
              to="/analytics"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              <ChartBarIcon className="w-5 h-5" />
              View Insights
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.path}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <QuickActionCard {...action} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <RecentOrders />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <UpcomingDeliveries />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;