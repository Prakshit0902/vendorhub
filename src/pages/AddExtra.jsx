
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '../components/ui/calendar';
import { 
  CalendarIcon,
  PlusIcon,
  ShoppingCartIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const AddExtra = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedItems, setSelectedItems] = useState({});
  const [occasion, setOccasion] = useState('');

  const occasions = [
    { name: 'Festival', icon: '🎉', items: ['Ghee', 'Sugar', 'Milk', 'Dry Fruits'] },
    { name: 'Weekend Special', icon: '🍳', items: ['Eggs', 'Bread', 'Butter', 'Juice'] },
    { name: 'Guest Visit', icon: '👥', items: ['Tea', 'Snacks', 'Sweets', 'Fruits'] },
    { name: 'Birthday', icon: '🎂', items: ['Cake Ingredients', 'Decorations', 'Soft Drinks'] },
  ];

  const handleAddExtra = () => {
    if (Object.keys(selectedItems).length === 0) {
      toast.error('Please select at least one item');
      return;
    }
    toast.success(`Extra items added for ${format(selectedDate, 'dd MMM yyyy')}`);
    setSelectedItems({});
    setOccasion('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Extra Items</h1>
        <p className="text-gray-600 dark:text-gray-400">Add special items for specific dates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Section */}
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Select Date
          </h2>
          <Calendar
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-lg border dark:border-gray-700"
          />
          
          {/* Quick Occasion Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Quick Select Occasion</h3>
            <div className="grid grid-cols-2 gap-2">
              {occasions.map((occ) => (
                <button
                  key={occ.name}
                  onClick={() => setOccasion(occ.name)}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                    occasion === occ.name
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{occ.icon}</span>
                  <span className="text-sm font-medium">{occ.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Items Selection */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ShoppingCartIcon className="w-5 h-5" />
            Extra Items for {format(selectedDate, 'dd MMM yyyy')}
          </h2>

          {/* Suggested Items based on Occasion */}
          {occasion && (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4" />
                Suggested for {occasion}
              </h3>
              <div className="flex flex-wrap gap-2">
                {occasions.find(o => o.name === occasion)?.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedItems(prev => ({ ...prev, [item]: (prev[item] || 0) + 1 }))}
                    className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg text-sm hover:shadow-md transition-all"
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Item Input */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search or add item..."
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    setSelectedItems(prev => ({ ...prev, [e.target.value]: 1 }));
                    e.target.value = '';
                  }
                }}
              />
              <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Items List */}
            {Object.keys(selectedItems).length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Selected Items</h3>
                {Object.entries(selectedItems).map(([item, quantity]) => (
                  <div key={item} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="font-medium">{item}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedItems(prev => ({
                          ...prev,
                          [item]: Math.max(0, quantity - 1)
                        }))}
                        className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setSelectedItems(prev => ({
                          ...prev,
                          [item]: quantity + 1
                        }))}
                        className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddExtra}
            className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Add Extra Items
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AddExtra;