import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';

const Success = () => {
  const { currentPlan } = useSubscription();

  useEffect(() => {
    // In a real application, you would verify the payment with your backend
    // and update the user's subscription status accordingly
    console.log('Payment successful - updating subscription status');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
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
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Welcome to your new {currentPlan} plan! Your subscription is now active and you have access to all premium features.
        </p>
        
        <div className="space-y-3">
          <Link
            to="/ai-therapy"
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            Try AI Therapist
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link
            to="/"
            className="btn btn-outline w-full"
          >
            Go to Dashboard
          </Link>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          You will receive a confirmation email shortly with your subscription details.
        </p>
      </motion.div>
    </div>
  );
};

export default Success;