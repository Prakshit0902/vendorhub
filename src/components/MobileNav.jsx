// components/MobileNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  PlusCircleIcon,
  DocumentTextIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const mobileNavItems = [
  { path: '/', name: 'Home', icon: HomeIcon },
  { path: '/daily-needs', name: 'Daily', icon: ShoppingCartIcon },
  { path: '/add-extra', name: 'Add', icon: PlusCircleIcon },
  { path: '/order-summary', name: 'Orders', icon: DocumentTextIcon },
  { path: '/profile', name: 'Profile', icon: UserIcon },
];

const MobileNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 lg:hidden z-50">
      <nav className="flex items-center justify-around py-2">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center gap-1 p-2 rounded-lg"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
                  transition={{ type: "spring", bounce: 0.25 }}
                />
              )}
              <Icon className={`w-6 h-6 relative z-10 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
              <span className={`text-xs relative z-10 ${isActive ? 'text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNav;