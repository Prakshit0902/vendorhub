// pages/Support.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Support = () => {
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const supportCategories = [
    { id: 1, name: 'Order Issues', icon: '📦' },
    { id: 2, name: 'Payment Problems', icon: '💳' },
    { id: 3, name: 'Delivery Concerns', icon: '🚚' },
    { id: 4, name: 'Product Quality', icon: '⚠️' },
    { id: 5, name: 'Technical Support', icon: '🔧' },
    { id: 6, name: 'Other', icon: '❓' },
  ];

  const faqs = [
    {
      question: 'How can I change my daily needs?',
      answer: 'Go to Daily Needs section and click Edit. Make your changes and click Save.'
    },
    {
      question: 'What is the return policy?',
      answer: 'You can return items within the same day or next day of delivery. Go to Return Items section.'
    },
    {
      question: 'How do I cancel a delivery?',
      answer: 'Visit Cancel Day section, select the date(s) you want to cancel, and provide a reason.'
    },
    {
      question: 'When will I receive my refund?',
      answer: 'Refunds are processed within 24-48 hours and credited to your next order.'
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim() || !selectedCategory) {
      toast.error('Please select a category and enter your message');
      return;
    }
    // pages/Support.jsx (continued)
    toast.success('Your message has been sent! We\'ll respond within 24 hours.');
    setMessage('');
    setSelectedCategory('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support Center</h1>
        <p className="text-gray-600 dark:text-gray-400">We're here to help you 24/7</p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg"
        >
          <PhoneIcon className="w-8 h-8 mb-3" />
          <h3 className="font-semibold mb-1">Call Us</h3>
          <p className="text-blue-100 text-sm mb-3">Mon-Sat, 9 AM - 7 PM</p>
          <a href="tel:+918001234567" className="font-medium hover:underline">
            +91 800-123-4567
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg"
        >
          <ChatBubbleLeftRightIcon className="w-8 h-8 mb-3" />
          <h3 className="font-semibold mb-1">WhatsApp</h3>
          <p className="text-green-100 text-sm mb-3">Quick responses</p>
          <a href="https://wa.me/918001234567" className="font-medium hover:underline">
            Chat Now
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg"
        >
          <EnvelopeIcon className="w-8 h-8 mb-3" />
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="text-purple-100 text-sm mb-3">For detailed queries</p>
          <a href="mailto:support@vendorhub.com" className="font-medium hover:underline">
            support@vendorhub.com
          </a>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Message Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PaperAirplaneIcon className="w-5 h-5" />
            Send us a Message
          </h2>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {supportCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                    selectedCategory === category.name
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue in detail..."
              rows="6"
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSendMessage}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
            Send Message
          </motion.button>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <QuestionMarkCircleIcon className="w-5 h-5" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
              >
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Can't find what you're looking for? Call us at{' '}
              <a href="tel:+918001234567" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                +91 800-123-4567
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Recent Tickets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ClockIcon className="w-5 h-5" />
          Recent Support Tickets
        </h2>

        <div className="space-y-3">
          {[
            { id: 'TKT001', subject: 'Wrong item delivered', status: 'resolved', date: '2 days ago' },
            { id: 'TKT002', subject: 'Payment not reflecting', status: 'in-progress', date: '5 days ago' },
            { id: 'TKT003', subject: 'Quality issue with vegetables', status: 'resolved', date: '1 week ago' },
          ].map((ticket) => (
            <div key={ticket.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium">{ticket.id}: {ticket.subject}</p>
                <p className="text-sm text-gray-500">{ticket.date}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                ticket.status === 'resolved' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
              }`}>
                {ticket.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Support;