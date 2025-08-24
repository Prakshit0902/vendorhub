// pages/ReturnItems.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUturnLeftIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ReturnItems = () => {
  const [selectedItems, setSelectedItems] = useState({});
  // pages/ReturnItems.jsx (continued)
  const [returnReason, setReturnReason] = useState('');
  
  const todaysDelivery = {
    date: new Date(),
    deliveryTime: '10:30 AM',
    items: [
      { id: 1, name: 'Tomatoes', quantity: 2, unit: 'kg', price: 80, image: '🍅' },
      { id: 2, name: 'Onions', quantity: 1.5, unit: 'kg', price: 45, image: '🧅' },
      { id: 3, name: 'Milk', quantity: 2, unit: 'L', price: 110, image: '🥛' },
      { id: 4, name: 'Rice', quantity: 5, unit: 'kg', price: 300, image: '🍚' },
      { id: 5, name: 'Cooking Oil', quantity: 1, unit: 'L', price: 150, image: '🛢️' },
    ],
    total: 685
  };

  const returnReasons = [
    { id: 1, text: 'Quality not satisfactory', icon: '⚠️' },
    { id: 2, text: 'Excess quantity delivered', icon: '📦' },
    { id: 3, text: 'Wrong item delivered', icon: '❌' },
    { id: 4, text: 'Damaged/Expired product', icon: '🚫' },
    { id: 5, text: 'Not needed anymore', icon: '🔄' },
  ];

  const handleReturn = () => {
    const hasSelectedItems = Object.values(selectedItems).some(qty => qty > 0);
    if (!hasSelectedItems) {
      toast.error('Please select items to return');
      return;
    }
    if (!returnReason) {
      toast.error('Please select a reason for return');
      return;
    }
    
    toast.success('Return request submitted successfully!');
    setSelectedItems({});
    setReturnReason('');
  };

  const updateReturnQuantity = (itemId, quantity) => {
    const item = todaysDelivery.items.find(i => i.id === itemId);
    if (!item) return;
    
    const maxQty = item.quantity;
    const newQty = Math.max(0, Math.min(maxQty, quantity));
    
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: newQty || undefined
    }));
  };

  const getTotalReturnAmount = () => {
    return Object.entries(selectedItems).reduce((total, [itemId, qty]) => {
      const item = todaysDelivery.items.find(i => i.id === parseInt(itemId));
      if (!item || !qty) return total;
      return total + (item.price * qty / item.quantity);
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Return Items</h1>
        <p className="text-gray-600 dark:text-gray-400">Return items from today's delivery</p>
      </div>

      {/* Delivery Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1">Today's Delivery</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Delivered at {todaysDelivery.deliveryTime}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
            <p className="text-2xl font-bold">₹{todaysDelivery.total}</p>
          </div>
        </div>
      </motion.div>

      {/* Items List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ArrowUturnLeftIcon className="w-5 h-5" />
            Select Items to Return
          </h3>
          
          <div className="space-y-4">
            {todaysDelivery.items.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border transition-all ${
                  selectedItems[item.id]
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.image}</span>
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        {item.quantity} {item.unit} @ ₹{item.price}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!selectedItems[item.id]}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateReturnQuantity(item.id, item.quantity);
                        } else {
                          updateReturnQuantity(item.id, 0);
                        }
                      }}
                      className="w-5 h-5 text-red-500"
                    />
                    {selectedItems[item.id] > 0 && (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={selectedItems[item.id]}
                          onChange={(e) => updateReturnQuantity(item.id, parseFloat(e.target.value))}
                          className="w-20 px-2 py-1 text-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                          step="0.5"
                          min="0"
                          max={item.quantity}
                        />
                        <span className="text-sm text-gray-500">{item.unit}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Return Reason */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4">Reason for Return</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {returnReasons.map((reason) => (
            <label
              key={reason.id}
              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                returnReason === reason.text
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <input
                type="radio"
                name="returnReason"
                value={reason.text}
                checked={returnReason === reason.text}
                onChange={(e) => setReturnReason(e.target.value)}
                className="text-blue-500"
              />
              <span className="text-2xl">{reason.icon}</span>
              <span className="font-medium">{reason.text}</span>
            </label>
          ))}
        </div>
        
        <textarea
          placeholder="Additional comments (optional)"
          className="w-full mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </motion.div>

      {/* Return Summary */}
      {Object.keys(selectedItems).length > 0 && getTotalReturnAmount() > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Return Summary</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Return amount will be adjusted in your next order
              </p>
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Return Amount:</span>
                <span className="text-xl font-bold">₹{getTotalReturnAmount().toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReturn}
            className="w-full mt-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Submit Return Request
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ReturnItems; 