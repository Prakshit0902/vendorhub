// pages/OrderSummary.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  CalendarIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ChevronDownIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const OrderSummary = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const orders = [
    {
      id: 'ORD001',
      date: new Date(),
      status: 'delivered',
      deliveryTime: '10:30 AM',
      items: 12,
      amount: 685,
      details: [
        { name: 'Tomatoes', quantity: '2 kg', price: 80 },
        { name: 'Onions', quantity: '1.5 kg', price: 45 },
        { name: 'Milk', quantity: '2 L', price: 110 },
        { name: 'Rice', quantity: '5 kg', price: 300 },
        { name: 'Cooking Oil', quantity: '1 L', price: 150 },
      ]
    },
    {
      id: 'ORD002',
      date: new Date(Date.now() - 86400000),
      status: 'delivered',
      deliveryTime: '11:00 AM',
      items: 8,
      amount: 420,
      details: [
        { name: 'Vegetables Mix', quantity: '3 kg', price: 120 },
        { name: 'Fruits', quantity: '2 kg', price: 150 },
        { name: 'Milk', quantity: '2 L', price: 110 },
        { name: 'Bread', quantity: '2 packs', price: 40 },
      ]
    },
    {
      id: 'ORD003',
      date: new Date(Date.now() + 86400000),
      status: 'scheduled',
      deliveryTime: 'Expected by 11 AM',
      items: 10,
      amount: 520,
      details: [
        { name: 'Daily Vegetables', quantity: '4 kg', price: 160 },
        { name: 'Milk', quantity: '2 L', price: 110 },
        { name: 'Eggs', quantity: '1 dozen', price: 80 },
        { name: 'Butter', quantity: '200g', price: 70 },
        { name: 'Cheese', quantity: '200g', price: 100 },
      ]
    },
    {
      id: 'ORD004',
      date: new Date(Date.now() - 172800000),
      status: 'cancelled',
      items: 5,
      amount: 280,
      reason: 'Out of town'
    }
  ];

  const statusConfig = {
    delivered: { icon: CheckCircleIcon, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/20' },
    scheduled: { icon: ClockIcon, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/20' },
    cancelled: { icon: XCircleIcon, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/20' },
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Summary</h1>
          // pages/OrderSummary.jsx (continued)
          <p className="text-gray-600 dark:text-gray-400">View and manage your orders</p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex gap-2">
          {['all', 'delivered', 'scheduled', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                filterStatus === status
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">{orders.length}</p>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</h3>
          <p className="text-3xl font-bold mt-2">₹{orders.reduce((sum, order) => sum + order.amount, 0)}</p>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Delivered</h3>
          <p className="text-3xl font-bold mt-2">{orders.filter(o => o.status === 'delivered').length}</p>
          <p className="text-sm text-gray-500 mt-1">Successfully</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Scheduled</h3>
          <p className="text-3xl font-bold mt-2">{orders.filter(o => o.status === 'scheduled').length}</p>
          <p className="text-sm text-gray-500 mt-1">Upcoming</p>
        </motion.div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const StatusIcon = statusConfig[order.status].icon;
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${statusConfig[order.status].bg}`}>
                      <StatusIcon className={`w-6 h-6 ${statusConfig[order.status].color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {format(order.date, 'dd MMM yyyy')}
                        </span>
                        {order.deliveryTime && (
                          <span className="flex items-center gap-1">
                            <TruckIcon className="w-4 h-4" />
                            {order.deliveryTime}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold">₹{order.amount}</p>
                      <p className="text-sm text-gray-500">{order.items} items</p>
                    </div>
                    <ChevronDownIcon className={`w-5 h-5 transition-transform ${selectedOrder === order.id ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>

              {/* Order Details */}
              {selectedOrder === order.id && order.details && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6">
                    <h4 className="font-semibold mb-4">Order Items</h4>
                    <div className="space-y-3">
                      {order.details.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.quantity}</p>
                          </div>
                          <p className="font-medium">₹{item.price}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="font-semibold">Total Amount</span>
                      <span className="text-xl font-bold">₹{order.amount}</span>
                    </div>

                    {order.status === 'delivered' && (
                      <div className="mt-4 flex gap-3">
                        <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                          <ArrowDownTrayIcon className="w-5 h-5" />
                          Download Invoice
                        </button>
                        <button className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                          Reorder
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Cancellation Reason */}
              {order.status === 'cancelled' && order.reason && (
                <div className="px-6 pb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Reason:</span> {order.reason}
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <DocumentTextIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {filterStatus === 'all' 
              ? "You haven't placed any orders yet" 
              : `No ${filterStatus} orders`}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default OrderSummary;