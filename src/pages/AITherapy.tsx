import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  MessageCircle, 
  Shield, 
  Clock, 
  CheckCircle,
  Lock,
  Sparkles
} from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import AITherapist from '../components/AITherapist';
import SubscriptionModal from '../components/SubscriptionModal';

const AITherapy = () => {
  const [showChat, setShowChat] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { hasAccess, getAITherapistLimit, isTrialActive } = useSubscription();
  
  const sessionLimit = getAITherapistLimit();
  const hasAIAccess = hasAccess('ai_therapist_limited') || hasAccess('ai_therapist_unlimited');

  const features = [
    {
      icon: Heart,
      title: 'Empathetic Listening',
      description: 'AI trained to provide compassionate, non-judgmental support'
    },
    {
      icon: Brain,
      title: 'Evidence-Based Approaches',
      description: 'Incorporates CBT, mindfulness, and other proven therapeutic techniques'
    },
    {
      icon: Shield,
      title: 'Safe & Private',
      description: 'Your conversations are completely confidential and secure'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Get support whenever you need it, day or night'
    }
  ];

  const benefits = [
    'Reduce stress and anxiety',
    'Improve emotional regulation',
    'Develop healthy coping strategies',
    'Enhance self-awareness',
    'Build resilience',
    'Process difficult emotions'
  ];

  if (showChat) {
    return (
      <div className="h-screen">
        <AITherapist onClose={() => setShowChat(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Therapist
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Your Personal Mental Health Companion
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get professional-quality therapeutic support powered by advanced AI. 
            Available 24/7 to help you navigate life's challenges with empathy and understanding.
          </p>
          
          {/* Access Status */}
          <div className="bg-white rounded-2xl p-6 max-w-md mx-auto mb-8 shadow-lg">
            {hasAIAccess || isTrialActive ? (
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">AI Therapist Access</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {sessionLimit === -1 
                    ? 'Unlimited sessions available'
                    : `${sessionLimit} sessions per month`
                  }
                </p>
                <button
                  onClick={() => setShowChat(true)}
                  className="btn btn-primary w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Therapy Session
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Premium Feature</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Upgrade to Premium or Enterprise to access AI Therapist
                </p>
                <button
                  onClick={() => setShowSubscriptionModal(true)}
                  className="btn btn-primary w-full"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose AI Therapy?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Transform Your Mental Health Journey
              </h2>
              <p className="text-gray-600 mb-8">
                Our AI therapist combines the latest in artificial intelligence with proven 
                therapeutic techniques to provide personalized mental health support that adapts to your unique needs.
              </p>
              <div className="grid gap-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white"
            >
              <div className="text-center">
                <Brain className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                <p className="mb-6 opacity-90">
                  Take the first step towards better mental health with our AI therapist.
                </p>
                {hasAIAccess || isTrialActive ? (
                  <button
                    onClick={() => setShowChat(true)}
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Begin Your Session
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Unlock AI Therapy
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Reminder */}
        {!hasAIAccess && !isTrialActive && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="card p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Choose Your Plan
              </h2>
              <p className="text-gray-600 mb-6">
                AI Therapist is available with Premium and Enterprise plans
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Premium Plan</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">$14.99/month</p>
                  <p className="text-gray-600 text-sm mb-4">10 AI therapy sessions per month</p>
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="btn btn-outline w-full"
                  >
                    Choose Premium
                  </button>
                </div>
                <div className="border-2 border-blue-500 rounded-lg p-6 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Best Value
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Enterprise Plan</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">$99.99/month</p>
                  <p className="text-gray-600 text-sm mb-4">Unlimited AI therapy sessions</p>
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="btn btn-primary w-full"
                  >
                    Choose Enterprise
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </div>
      
      {showSubscriptionModal && (
        <SubscriptionModal 
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)} 
        />
      )}
    </div>
  );
};

export default AITherapy;