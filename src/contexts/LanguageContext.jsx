// components/LanguageContext.jsx
import React, { createContext, useContext, useState } from 'react';

// components/LanguageContext.jsx (continued)
const translations = {
  en: {
    welcome: 'Welcome back, Vendor!',
    dashboard: 'Dashboard',
    dailyNeeds: 'Daily Needs',
    addExtra: 'Add Extra Items',
    cancelDay: 'Cancel Delivery',
    returnItems: 'Return Items',
    orderSummary: 'Order Summary',
    analytics: 'Analytics',
    profile: 'Profile',
    support: 'Support',
    todaysOrders: "Today's Orders",
    pendingDeliveries: 'Pending Deliveries',
    thisMonth: 'This Month',
    itemsSaved: 'Items Saved',
    quickActions: 'Quick Actions',
    recentOrders: 'Recent Orders',
    upcomingDeliveries: 'Upcoming Deliveries',
  },
  hi: {
    welcome: 'स्वागत है, विक्रेता!',
    dashboard: 'डैशबोर्ड',
    dailyNeeds: 'दैनिक जरूरतें',
    addExtra: 'अतिरिक्त सामान जोड़ें',
    cancelDay: 'डिलीवरी रद्द करें',
    returnItems: 'सामान वापस करें',
    orderSummary: 'ऑर्डर सारांश',
    analytics: 'विश्लेषण',
    profile: 'प्रोफ़ाइल',
    support: 'समर्थन',
    todaysOrders: 'आज के ऑर्डर',
    pendingDeliveries: 'लंबित डिलीवरी',
    thisMonth: 'इस महीने',
    itemsSaved: 'सहेजे गए सामान',
    quickActions: 'त्वरित कार्य',
    recentOrders: 'हाल के आदेश',
    upcomingDeliveries: 'आगामी डिलीवरी',
  },
  mr: {
    welcome: 'परत आपले स्वागत आहे, विक्रेता!',
    dashboard: 'डॅशबोर्ड',
    dailyNeeds: 'दैनंदिन गरजा',
    addExtra: 'अतिरिक्त वस्तू जोडा',
    cancelDay: 'वितरण रद्द करा',
    returnItems: 'वस्तू परत करा',
    orderSummary: 'ऑर्डर सारांश',
    analytics: 'विश्लेषण',
    profile: 'प्रोफाइल',
    support: 'समर्थन',
    todaysOrders: 'आजचे ऑर्डर',
    pendingDeliveries: 'प्रलंबित वितरण',
    thisMonth: 'या महिन्यात',
    itemsSaved: 'जतन केलेल्या वस्तू',
    quickActions: 'त्वरित क्रिया',
    recentOrders: 'अलीकडील ऑर्डर',
    upcomingDeliveries: 'आगामी वितरण',
  },
  ta: {
    welcome: 'மீண்டும் வரவேற்கிறோம், விற்பனையாளர்!',
    dashboard: 'டாஷ்போர்டு',
    dailyNeeds: 'தினசரி தேவைகள்',
    addExtra: 'கூடுதல் பொருட்கள் சேர்',
    cancelDay: 'டெலிவரி ரத்து',
    returnItems: 'பொருட்களை திருப்பி',
    orderSummary: 'ஆர்டர் சுருக்கம்',
    analytics: 'பகுப்பாய்வு',
    profile: 'சுயவிவரம்',
    support: 'ஆதரவு',
    todaysOrders: 'இன்றைய ஆர்டர்கள்',
    pendingDeliveries: 'நிலுவையில் உள்ள டெலிவரி',
    thisMonth: 'இந்த மாதம்',
    itemsSaved: 'சேமிக்கப்பட்ட பொருட்கள்',
    quickActions: 'விரைவு செயல்கள்',
    recentOrders: 'சமீபத்திய ஆர்டர்கள்',
    upcomingDeliveries: 'வரவிருக்கும் டெலிவரி',
  },
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};