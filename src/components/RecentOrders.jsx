// components/RecentOrders.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon } from '@heroicons/react/24/outline';

const RecentOrders = () => {
  const recentOrders = [
    { id: 'ORD001', time: '10:30 AM', items: 12, amount: 685, status: 'delivered' },
    { id: 'ORD002', time: 'Yesterday', items: 8, amount: 420, status: 'delivered' },
    { id: 'ORD003', time: '2 days ago', items: 15, amount: 890, status: 'delivered' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <Link to="/order-summary" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          View all
        </Link>
      </div>
      
      <div className="space-y-4">
        {recentOrders.map((order) => (
          <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <ClockIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-gray-500">{order.time} • {order.items} items</p>
              </div>
            </div>
            <p className="font-semibold">₹{order.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;