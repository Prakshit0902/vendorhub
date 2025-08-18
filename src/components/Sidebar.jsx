// components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  PlusCircleIcon, 
  XCircleIcon, 
  ArrowUturnLeftIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { path: '/', name: 'Dashboard', icon: HomeIcon, color: 'from-blue-500 to-cyan-500' },
  { path: '/daily-needs', name: 'Daily Needs', icon: ShoppingCartIcon, color: 'from-purple-500 to-pink-500' },
  { path: '/add-extra', name: 'Add Extra', icon: PlusCircleIcon, color: 'from-green-500 to-emerald-500' },
  { path: '/cancel-day', name: 'Cancel Day', icon: XCircleIcon, color: 'from-red-500 to-rose-500' },
  { path: '/return-items', name: 'Return Items', icon: ArrowUturnLeftIcon, color: 'from-orange-500 to-amber-500' },
  { path: '/order-summary', name: 'Orders', icon: DocumentTextIcon, color: 'from-indigo-500 to-blue-500' },
  { path: '/analytics', name: 'Analytics', icon: ChartBarIcon, color: 'from-violet-500 to-purple-500' },
  { path: '/profile', name: 'Profile', icon: UserIcon, color: 'from-gray-500 to-gray-600' },
  { path: '/support', name: 'Support', icon: ChatBubbleLeftRightIcon, color: 'from-teal-500 to-cyan-500' },
];

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 z-40 h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300 hidden lg:block ${
          open ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-75" />
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <AnimatePresence>
              {open && (
                <motion.h1 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  VendorHub
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={open ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="group relative"
              >
                <div className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r text-white shadow-lg transform scale-105' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
                style={isActive ? { backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, '--tw-gradient-from': item.color.split(' ')[1], '--tw-gradient-to': item.color.split(' ')[3] } : {}}>
                  <div className={`p-1 rounded-lg ${isActive ? 'bg-white/20' : `bg-gradient-to-r ${item.color} bg-opacity-10`}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : `text-gray-700 dark:text-gray-300`}`} />
                  </div>
                  <AnimatePresence>
                    {open && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className={`font-medium ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Tooltip for collapsed sidebar */}
                {!open && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-sm mb-1">Need Help?</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Get 24/7 support</p>
                <Link to="/support" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Contact Support →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
  );
};

export default Sidebar;