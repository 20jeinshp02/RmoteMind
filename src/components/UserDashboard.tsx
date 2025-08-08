import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Award,
  Calendar,
  Clock,
  TrendingUp,
  Edit3,
  Camera,
  Save,
  LogOut,
  CreditCard,
  Download,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import SubscriptionModal from './SubscriptionModal';

const UserDashboard = () => {
  const { user, logout, updateProfile } = useAuth();
  const { currentPlan, hasAccess } = useSubscription();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  if (!user) return null;

  const userStats = [
    { label: 'Days Active', value: user.stats.daysActive.toString(), icon: Calendar, color: 'bg-blue-500' },
    { label: 'Meditation Hours', value: user.stats.meditationHours.toString(), icon: Clock, color: 'bg-green-500' },
    { label: 'Community Posts', value: user.stats.communityPosts.toString(), icon: User, color: 'bg-purple-500' },
    { label: 'Wellness Score', value: `${user.stats.wellnessScore}/10`, icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const achievements = [
    { name: 'First Week', description: 'Completed your first week', earned: true, date: '2024-01-15' },
    { name: 'Meditation Master', description: '10 hours of meditation', earned: true, date: '2024-01-22' },
    { name: 'Community Helper', description: 'Helped 5 community members', earned: true, date: '2024-01-28' },
    { name: 'Consistency King', description: '30 days streak', earned: false, progress: 85 },
    { name: 'Wellness Warrior', description: 'Complete all wellness modules', earned: false, progress: 60 },
    { name: 'Focus Champion', description: '100 focus sessions', earned: false, progress: 73 }
  ];

  const recentActivity = [
    { type: 'meditation', title: 'Completed "Stress Relief" session', time: '2 hours ago', icon: Target },
    { type: 'community', title: 'Posted in Remote Parents group', time: '5 hours ago', icon: User },
    { type: 'productivity', title: 'Finished 4 Pomodoro sessions', time: '1 day ago', icon: Zap },
    { type: 'achievement', title: 'Earned "Community Helper" badge', time: '2 days ago', icon: Award }
  ];

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        name: editForm.name,
        email: editForm.email
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const getSubscriptionStatus = () => {
    const status = user.subscription.status;
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      past_due: 'bg-yellow-100 text-yellow-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <button className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    className="text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubscriptionStatus()}`}>
                      {user.subscription.plan} Plan
                    </span>
                    <span className="text-sm text-gray-500">
                      Member since {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="btn btn-primary flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline text-red-600 border-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {userStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent Activity */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Current Subscription</h3>
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="btn btn-primary"
                  >
                    Manage Plan
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Plan Details</h4>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">Current Plan:</span> {user.subscription.plan}</p>
                      <p><span className="text-gray-600">Status:</span> 
                        <span className={`ml-2 px-2 py-1 rounded text-sm ${getSubscriptionStatus()}`}>
                          {user.subscription.status}
                        </span>
                      </p>
                      <p><span className="text-gray-600">Next Billing:</span> {new Date(user.subscription.currentPeriodEnd).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Features Access</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${hasAccess('ai_therapist_limited') ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className="text-sm">AI Therapist</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${hasAccess('premium_content') ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className="text-sm">Premium Content</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${hasAccess('priority_support') ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className="text-sm">Priority Support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Billing History</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Premium Plan - Monthly</p>
                      <p className="text-sm text-gray-500">January 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$19.99</p>
                      <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-6">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl border-2 ${
                      achievement.earned
                        ? 'border-yellow-300 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.earned ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}>
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{achievement.name}</h4>
                        {achievement.earned && achievement.date && (
                          <p className="text-sm text-gray-500">{achievement.date}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{achievement.description}</p>
                    {!achievement.earned && achievement.progress && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive updates about your progress</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-gray-600">Get reminders for meditation sessions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-6 text-red-600">Danger Zone</h3>
                <div className="space-y-4">
                  <button className="w-full p-4 border-2 border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
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

export default UserDashboard;