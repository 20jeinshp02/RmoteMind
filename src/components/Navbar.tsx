import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Brain, 
  Target, 
  User, 
  Menu, 
  X,
  Crown,
  MessageCircle
} from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import SubscriptionModal from './SubscriptionModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const location = useLocation();
  const { currentPlan, isTrialActive, trialDaysLeft } = useSubscription();

  const navItems = [
    { path: '#', label: 'Subscriptions', icon: Crown, onClick: () => setShowSubscriptionModal(true) },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/stress', label: 'Stress Management', icon: Brain },
    { path: '/ai-therapy', label: 'AI Therapy', icon: MessageCircle },
    { path: '/productivity', label: 'Productivity', icon: Target },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">RemoteMind</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              if (item.onClick) {
                return (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Subscription Status */}
             {isTrialActive && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-md">
                <span className="text-xs text-amber-700 font-medium">
                  Trial: {trialDaysLeft} days left
                </span>
              </div>
            )}
            

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              if (item.onClick) {
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.onClick();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-600 hover:text-primary-600 hover:bg-gray-50 w-full text-left"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Mobile Subscription Status */}
             {isTrialActive && (
              <div className="mx-3 my-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-md">
                <span className="text-sm text-amber-700 font-medium">
                  Trial: {trialDaysLeft} days left
                </span>
              </div>
            )}
            

          </div>
        </motion.div>
      )}
      
      {/* Subscription Modal */}
      <SubscriptionModal 
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </nav>
  );
};

export default Navbar;