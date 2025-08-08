import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home.tsx';
import Community from './pages/Community.tsx';
import StressManagement from './pages/StressManagement.tsx';
import Productivity from './pages/Productivity.tsx';
import Profile from './pages/Profile.tsx';
import AITherapy from './pages/AITherapy.tsx';
import Success from './pages/Success.tsx';
import Cancel from './pages/Cancel.tsx';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
        <SubscriptionProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <motion.main
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.5 }}
                 className="pt-16"
               >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/stress" element={<StressManagement />} />
                  <Route path="/productivity" element={<Productivity />} />
                  <Route path="/ai-therapy" element={<AITherapy />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/cancel" element={<Cancel />} />
                </Routes>
              </motion.main>
            </div>
          </Router>
        </SubscriptionProvider>
      </AuthProvider>
  );
}

export default App;