// pages/DailyNeeds.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  MinusIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const categories = [
  { id: 1, name: 'Vegetables', icon: '🥬', color: 'from-green-500 to-emerald-500' },
  { id: 2, name: 'Fruits', icon: '🍎', color: 'from-red-500 to-pink-500' },
  { id: 3, name: 'Dairy', icon: '🥛', color: 'from-blue-500 to-cyan-500' },
  { id: 4, name: 'Grains', icon: '🌾', color: 'from-yellow-500 to-orange-500' },
  { id: 5, name: 'Spices', icon: '🌶️', color: 'from-orange-500 to-red-500' },
  { id: 6, name: 'Oil & Ghee', icon: '🛢️', color: 'from-amber-500 to-yellow-500' },
];

const products = [
  { id: 1, name: 'Tomatoes', category: 1, unit: 'kg', price: 40, image: '🍅' },
  { id: 2, name: 'Onions', category: 1, unit: 'kg', price: 30, image: '🧅' },
  { id: 3, name: 'Potatoes', category: 1, unit: 'kg', price: 25, image: '🥔' },
  { id: 4, name: 'Rice', category: 4, unit: 'kg', price: 60, image: '🍚' },
  { id: 5, name: 'Wheat Flour', category: 4, unit: 'kg', price: 45, image: '🌾' },
  { id: 6, name: 'Milk', category: 3, unit: 'L', price: 55, image: '🥛' },
  { id: 7, name: 'Curd', category: 3, unit: 'kg', price: 50, image: '🥛' },
  { id: 8, name: 'Paneer', category: 3, unit: 'kg', price: 280, image: '🧀' },
  { id: 9, name: 'Apples', category: 2, unit: 'kg', price: 120, image: '🍎' },
  { id: 10, name: 'Bananas', category: 2, unit: 'dozen', price: 40, image: '🍌' },
  { id: 11, name: 'Cooking Oil', category: 6, unit: 'L', price: 150, image: '🛢️' },
  { id: 12, name: 'Ghee', category: 6, unit: 'kg', price: 500, image: '🧈' },
];

const DailyNeeds = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dailyNeeds, setDailyNeeds] = useState({});
  const [isEditing, setIsEditing] = useState(true);

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const updateQuantity = (productId, change) => {
    setDailyNeeds(prev => {
      const current = prev[productId] || 0;
      const newQty = Math.max(0, current + change);
      if (newQty === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const saveDailyNeeds = () => {
    setIsEditing(false);
    toast.success('Daily needs saved successfully!');
  };

  const getTotalItems = () => Object.keys(dailyNeeds).length;
  const getTotalCost = () => {
    return Object.entries(dailyNeeds).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Needs</h1>
          <p className="text-gray-600 dark:text-gray-400">Set up your recurring daily orders</p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveDailyNeeds}
              disabled={getTotalItems() === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckIcon className="w-5 h-5" />
              Save Daily Needs
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
            >
              Edit Daily Needs
            </motion.button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</h3>
          <p className="text-3xl font-bold mt-2">{getTotalItems()}</p>
          <p className="text-sm text-gray-500 mt-1">products selected</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Daily Cost</h3>
          <p className="text-3xl font-bold mt-2">₹{getTotalCost()}</p>
          <p className="text-sm text-gray-500 mt-1">estimated per day</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Cost</h3>
          <p className="text-3xl font-bold mt-2">₹{getTotalCost() * 30}</p>
          <p className="text-sm text-gray-500 mt-1">estimated per month</p>
        </motion.div>
      </div>

      {/* Search and Categories */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              !selectedCategory 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              style={selectedCategory === category.id ? { backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` } : {}}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{product.image}</span>
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">₹{product.price}/{product.unit}</p>
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(product.id, -0.5)}
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={dailyNeeds[product.id] || 0}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    setDailyNeeds(prev => ({ ...prev, [product.id]: value }));
                  }}
                  className="w-20 text-center bg-gray-100 dark:bg-gray-700 rounded-lg px-2 py-1"
                  step="0.5"
                  min="0"
                />
                <button
                  onClick={() => updateQuantity(product.id, 0.5)}
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-500">{product.unit}</span>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                {dailyNeeds[product.id] ? (
                  <>
                    <span className="font-medium">{dailyNeeds[product.id]} {product.unit}</span>
                    <span className="text-sm text-gray-500">₹{product.price * dailyNeeds[product.id]}/day</span>
                  </>
                ) : (
                  <span className="text-sm text-gray-400">Not in daily needs</span>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Selected Items Summary */}
      {getTotalItems() > 0 && !isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 lg:bottom-8 left-4 right-4 lg:left-auto lg:right-8 lg:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="font-semibold mb-3">Daily Order Summary</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {Object.entries(dailyNeeds).map(([productId, quantity]) => {
              const product = products.find(p => p.id === parseInt(productId));
              if (!product) return null;
              return (
                <div key={productId} className="flex justify-between text-sm">
                  <span>{product.name} ({quantity} {product.unit})</span>
                  <span>₹{product.price * quantity}</span>
                </div>
              );
            })}
          </div>
          <div className="border-t dark:border-gray-700 mt-3 pt-3">
            <div className="flex justify-between font-semibold">
              <span>Total Daily Cost</span>
              <span>₹{getTotalCost()}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DailyNeeds;