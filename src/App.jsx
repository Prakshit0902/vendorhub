import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DailyNeeds from './pages/DailyNeeds';
import AddExtra from './pages/AddExtra';
import CancelDay from './pages/CancelDay';
import ReturnItems from './pages/ReturnItems';
import OrderSummary from './pages/OrderSummary';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Support from './pages/Support';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="daily-needs" element={<DailyNeeds />} />
                <Route path="add-extra" element={<AddExtra />} />
                <Route path="cancel-day" element={<CancelDay />} />
                <Route path="return-items" element={<ReturnItems />} />
                <Route path="order-summary" element={<OrderSummary />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="profile" element={<Profile />} />
                <Route path="support" element={<Support />} />
              </Route>
            </Routes>
          </AnimatePresence>
          <Toaster position="top-right" />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
