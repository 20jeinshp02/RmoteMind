import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle className="w-10 h-10 text-red-600" />
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges were made to your account. You can try again anytime or continue with your current plan.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => window.history.back()}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Try Again
          </button>
          
          <Link
            to="/"
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Need help?</strong> Contact our support team if you're experiencing issues with payment.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Cancel;