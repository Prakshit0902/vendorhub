// pages/Profile.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  CameraIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    shopName: 'Kumar\'s Kitchen',
    shopType: 'Restaurant',
    address: '123, MG Road, Bangalore',
    pincode: '560001',
    gstNumber: 'GST123456789',
    preferredDeliveryTime: '10:00 AM - 11:00 AM',
    language: 'English',
  });

  const shopTypes = [
    'Restaurant',
    'Cafe',
    'Sweet Shop',
    'Bakery',
    'Cloud Kitchen',
    'Street Food',
    'Catering Service'
  ];

  // pages/Profile.jsx (continued)
  const deliverySlots = [
    '6:00 AM - 7:00 AM',
    '7:00 AM - 8:00 AM',
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendor Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account information</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isEditing 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isEditing ? (
            <>
              <CheckIcon className="w-5 h-5" />
              Save Changes
            </>
          ) : (
            <>
              Edit Profile
            </>
          )}
        </motion.button>
      </div>

      {/* Profile Picture Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src="https://ui-avatars.com/api/?name=Rajesh+Kumar&background=6366f1&color=fff&size=128"
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                <CameraIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{profileData.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{profileData.shopName}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                Active Vendor
              </span>
              <span className="text-sm text-gray-500">Member since Oct 2023</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <UserCircleIcon className="w-5 h-5" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Preferred Language
            </label>
            <select
              value={profileData.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            >
              <option value="English">English</option>
              <option value="Hindi">हिंदी</option>
              <option value="Marathi">मराठी</option>
              <option value="Tamil">தமிழ்</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Shop Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BuildingStorefrontIcon className="w-5 h-5" />
          Shop Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Shop Name
            </label>
            <input
              type="text"
              value={profileData.shopName}
              onChange={(e) => handleInputChange('shopName', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Shop Type
            </label>
            <select
              value={profileData.shopType}
              onChange={(e) => handleInputChange('shopType', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            >
              {shopTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Shop Address
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                value={profileData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                rows="3"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Pincode
            </label>
            <input
              type="text"
              value={profileData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              GST Number (Optional)
            </label>
            <input
              type="text"
              value={profileData.gstNumber}
              onChange={(e) => handleInputChange('gstNumber', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>
        </div>
      </motion.div>

      {/* Delivery Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4">Delivery Preferences</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preferred Delivery Time
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {deliverySlots.map((slot) => (
              <label
                key={slot}
                className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
                  profileData.preferredDeliveryTime === slot
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                } ${!isEditing ? 'cursor-not-allowed opacity-60' : ''}`}
              >
                <input
                  type="radio"
                  name="deliveryTime"
                  value={slot}
                  checked={profileData.preferredDeliveryTime === slot}
                  onChange={(e) => handleInputChange('preferredDeliveryTime', e.target.value)}
                  disabled={!isEditing}
                  className="sr-only"
                />
                <span className="text-sm font-medium">{slot}</span>
              </label>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats & Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Your Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl mb-1">🏆</div>
            <p className="font-semibold">150+</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Orders Completed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-1">⭐</div>
            <p className="font-semibold">4.8/5</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Vendor Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-1">💰</div>
            <p className="font-semibold">₹12K</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Saved This Year</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-1">🎯</div>
            <p className="font-semibold">98%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">On-time Delivery</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;