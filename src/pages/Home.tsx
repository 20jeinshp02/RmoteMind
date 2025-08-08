import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Users, 
  Target, 
  Heart, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SubscriptionModal from '../components/SubscriptionModal';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const features = [
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with fellow remote workers who understand your challenges and celebrate your wins.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'Stress Management',
      description: 'Access guided meditations, breathing exercises, and mindfulness tools designed for remote work.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Productivity Tools',
      description: 'Boost your focus with time management techniques and work-life balance strategies.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const benefits = [
    'Reduce isolation and loneliness',
    'Improve work-life balance',
    'Build healthy remote work habits',
    'Connect with like-minded professionals',
    'Access 24/7 mental health resources',
    'Track your wellness progress'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Mental Health Support for
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {' '}Remote Workers
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                RemoteMind provides a comprehensive platform to support your mental wellbeing, 
                connect with others, and thrive in your remote work journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/community"
                      className="btn btn-primary text-lg px-8 py-3 inline-flex items-center gap-2"
                    >
                      Join Community
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/stress-management"
                      className="btn btn-outline text-lg px-8 py-3"
                    >
                      Start Wellness Journey
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="btn btn-primary text-lg px-8 py-3 inline-flex items-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    See Plans
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Thrive
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines community support, wellness tools, and productivity features 
              specifically designed for remote workers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Remote Workers Choose RemoteMind
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Working remotely comes with unique challenges. We understand the isolation, 
                the blurred boundaries, and the need for connection. That's why we built 
                RemoteMind specifically for you.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">10k+</div>
                    <div className="text-primary-100">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">95%</div>
                    <div className="text-primary-100">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-primary-100">Support Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-primary-100">Wellness Tools</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Remote Work Experience?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of remote workers who have found their community and improved their wellbeing with RemoteMind.
            </p>
            {isAuthenticated ? (
              <Link
                to="/community"
                className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go to Community
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <button
                onClick={() => setShowSubscriptionModal(true)}
                className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                See Plans
                <CreditCard className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
};

export default Home;