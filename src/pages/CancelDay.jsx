// pages/CancelDay.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '../components/ui/calendar';
import { 
  CalendarDaysIcon,
  XCircleIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { format, addDays, isSameDay } from 'date-fns';

const CancelDay = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [cancelReason, setCancelReason] = useState('');
  
  const upcomingDeliveries = [
    { date: new Date(), status: 'scheduled', items: 12, amount: 580 },
    { date: addDays(new Date(), 1), status: 'scheduled', items: 10, amount: 450 },
    { date: addDays(new Date(), 2), status: 'scheduled', items: 15, amount: 720 },
    { date: addDays(new Date(), 3), status: 'scheduled', items: 8, amount: 380 },
  ];

  const cancelledDates = [
    { date: addDays(new Date(), -2), reason: 'Out of town' },
    { date: addDays(new Date(), -5), reason: 'Festival holiday' },
  ];

  const reasons = [
    'Out of town',
    'Festival/Holiday',
    'Have sufficient stock',
    'Closing shop',
    'Other'
  ];

  const handleCancel = () => {
    if (selectedDates.length === 0) {
      toast.error('Please select at least one date');
      return;
    }
    if (!cancelReason) {
      toast.error('Please select a reason');
      return;
    }
    
    toast.success(`Cancelled delivery for ${selectedDates.length} day(s)`);
    setSelectedDates([]);
    setCancelReason('');
  };

  const toggleDate = (date) => {
    setSelectedDates(prev => {
      const exists = prev.find(d => isSameDay(d, date));
      if (exists) {
        return prev.filter(d => !isSameDay(d, date));
      }
      return [...prev, date];
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cancel Delivery</h1>
        <p className="text-gray-600 dark:text-gray-400">Skip delivery for specific days</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CalendarDaysIcon className="w-5 h-5" />
            Select Dates to Cancel
          </h2>
          
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={setSelectedDates}
            className="rounded-lg border dark:border-gray-700"
            disabled={(date) => date < new Date()}
          />

          {/* Quick Selection */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDates([addDays(new Date(), 1)])}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              Tomorrow
            </button>
            <button
              onClick={() => setSelectedDates([
                addDays(new Date(), 6),
                addDays(new Date(), 7)
              ])}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              Next Weekend
            </button>
            <button
              onClick={() => setSelectedDates(
                Array.from({ length: 7 }, (_, i) => addDays(new Date(), i + 1))
              )}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              Next 7 Days
            </button>
          </div>
        </motion.div>

        {/* Cancellation Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Reason Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Cancellation Reason</h3>
            <div className="space-y-2">
              {reasons.map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={cancelReason === reason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="text-blue-500"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Selected Dates Summary */}
          {selectedDates.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Selected Dates</h3>
              <div className="space-y-2">
                {selectedDates.map((date) => (
                  <div key={date.toString()} className="flex items-center justify-between">
                    <span className="text-sm">{format(date, 'dd MMM yyyy')}</span>
                    <button
                      onClick={() => toggleDate(date)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <XCircleIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCancel}
                className="w-full mt-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Cancel {selectedDates.length} Day{selectedDates.length > 1 ? 's' : ''}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Upcoming Deliveries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ClockIcon className="w-5 h-5" />
          Upcoming Deliveries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingDeliveries.map((delivery) => (
            <div
              key={delivery.date.toString()}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{format(delivery.date, 'dd MMM')}</span>
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {delivery.items} items
              </p>
              <p className="text-lg font-semibold">₹{delivery.amount}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CancelDay;