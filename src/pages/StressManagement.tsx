import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Heart, 
  Brain, 
  Zap,
  Clock,
  CheckCircle,
  Star,
  Lock,
  Volume2
} from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import SubscriptionModal from '../components/SubscriptionModal';

const StressManagement = () => {
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { hasAccess, isTrialActive, trialDaysLeft } = useSubscription();
  const { isPlaying, currentTime, duration, currentExercise, currentMeditation, playBreathingExercise, playMeditation, stop, setVolume } = useAudioPlayer();

  const breathingExercises = [
    {
      id: 1,
      name: '4-7-8 Breathing',
      description: 'Inhale for 4, hold for 7, exhale for 8. Great for anxiety relief.',
      duration: '5 min',
      difficulty: 'Beginner',
      benefits: ['Reduces anxiety', 'Improves sleep', 'Calms mind']
    },
    {
      id: 2,
      name: 'Box Breathing',
      description: 'Equal counts for inhale, hold, exhale, hold. Used by Navy SEALs.',
      duration: '10 min',
      difficulty: 'Intermediate',
      benefits: ['Increases focus', 'Reduces stress', 'Improves performance']
    },
    {
      id: 3,
      name: 'Belly Breathing',
      description: 'Deep diaphragmatic breathing to activate relaxation response.',
      duration: '8 min',
      difficulty: 'Beginner',
      benefits: ['Lowers blood pressure', 'Reduces cortisol', 'Improves digestion']
    }
  ];

  const meditations = [
    {
      id: 1,
      title: 'Remote Work Stress Relief',
      instructor: 'Dr. Sarah Williams',
      duration: '15 min',
      category: 'Stress Relief',
      rating: 4.8,
      plays: 12847
    },
    {
      id: 2,
      title: 'Focus & Productivity Boost',
      instructor: 'Mark Chen',
      duration: '20 min',
      category: 'Focus',
      rating: 4.9,
      plays: 9632
    },
    {
      id: 3,
      title: 'Work-Life Balance Meditation',
      instructor: 'Emma Rodriguez',
      duration: '12 min',
      category: 'Balance',
      rating: 4.7,
      plays: 8451
    },
    {
      id: 4,
      title: 'Quick Energy Reset',
      instructor: 'Alex Thompson',
      duration: '5 min',
      category: 'Energy',
      rating: 4.6,
      plays: 15203
    }
  ];

  const quickTools = [
    {
      name: 'Pomodoro Timer',
      description: '25-minute focused work sessions',
      icon: Clock,
      color: 'from-red-500 to-orange-500'
    },
    {
      name: 'Mood Check-in',
      description: 'Track your emotional state',
      icon: Heart,
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Stress Level Monitor',
      description: 'Monitor and log stress levels',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      name: 'Energy Booster',
      description: 'Quick exercises to boost energy',
      icon: Zap,
      color: 'from-yellow-500 to-amber-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stress Management & Wellness
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take control of your mental wellbeing with our collection of mindfulness tools, 
            breathing exercises, and guided meditations designed for remote workers.
          </p>
        </div>

        {/* Quick Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Wellness Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Breathing Exercises */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Breathing Exercises</h2>
            <div className="space-y-4">
              {breathingExercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`card p-6 cursor-pointer transition-all ${
                    selectedExercise === exercise.id ? 'ring-2 ring-primary-500 bg-primary-50' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedExercise(exercise.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{exercise.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{exercise.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {exercise.duration}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          exercise.difficulty === 'Beginner' 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                    </div>
                    <button 
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!hasAccess('breathing') && !isTrialActive) {
                          setShowSubscriptionModal(true);
                          return;
                        }
                        const exerciseMap: Record<number, string> = {
                          1: '4-7-8',
                          2: 'box', 
                          3: 'belly'
                        };
                        const exerciseType = exerciseMap[exercise.id];
                        
                        if (isPlaying && currentExercise === exerciseType) {
                          stop();
                        } else {
                          playBreathingExercise(exerciseType);
                        }
                      }}
                    >
                      {!hasAccess('breathing') && !isTrialActive ? (
                        <Lock className="w-4 h-4" />
                      ) : (isPlaying && currentExercise === (['4-7-8', 'box', 'belly'][exercise.id - 1])) ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exercise.benefits.map((benefit) => (
                      <span key={benefit} className="flex items-center gap-1 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {benefit}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Guided Meditations */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Guided Meditations</h2>
            <div className="space-y-4">
              {meditations.map((meditation, index) => (
                <motion.div
                  key={meditation.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{meditation.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">by {meditation.instructor}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {meditation.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {meditation.rating}
                        </span>
                        <span>{meditation.plays.toLocaleString()} plays</span>
                      </div>
                      <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                        meditation.category === 'Stress Relief' ? 'bg-red-100 text-red-700' :
                        meditation.category === 'Focus' ? 'bg-blue-100 text-blue-700' :
                        meditation.category === 'Balance' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {meditation.category}
                      </span>
                    </div>
                    <button 
                      className="btn btn-primary ml-4"
                      onClick={() => {
                        if (!hasAccess('meditation') && !isTrialActive) {
                          setShowSubscriptionModal(true);
                          return;
                        }
                        const meditationId = meditation.id.toString();
                        
                        if (isPlaying && currentMeditation === meditationId) {
                          stop();
                        } else {
                          playMeditation(meditationId);
                        }
                      }}
                    >
                      {!hasAccess('meditation') && !isTrialActive ? (
                        <Lock className="w-4 h-4" />
                      ) : (isPlaying && currentMeditation === meditation.id.toString()) ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Progress Tracking */}
        <section className="mt-12">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Wellness Journey</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">7</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Days Streak</h3>
                <p className="text-gray-600 text-sm">Consecutive days of practice</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">42</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Sessions Completed</h3>
                <p className="text-gray-600 text-sm">Total meditation sessions</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">8.2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Hours Practiced</h3>
                <p className="text-gray-600 text-sm">Total time in meditation</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button className="btn btn-primary">
                View Detailed Progress
              </button>
            </div>
          </div>
        </section>

        {/* Trial Banner */}
        {isTrialActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6 rounded-xl mt-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Free Trial Active</h3>
                <p className="text-primary-100">
                  {trialDaysLeft} days remaining. Upgrade to continue enjoying all features.
                </p>
              </div>
              <button
                onClick={() => setShowSubscriptionModal(true)}
                className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
              >
                Upgrade Now
              </button>
            </div>
          </motion.div>
        )}

        {/* Audio Progress */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Now Playing</h3>
              <div className="flex items-center gap-4">
                <Volume2 className="w-5 h-5 text-gray-600" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue="0.7"
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20"
                />
                <button
                  onClick={stop}
                  className="btn btn-outline"
                >
                  Stop
                </button>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>{Math.floor(currentTime / 60)}:{(Math.floor(currentTime) % 60).toString().padStart(2, '0')}</span>
              <span>{Math.floor(duration / 60)}:{(Math.floor(duration) % 60).toString().padStart(2, '0')}</span>
            </div>
          </motion.div>
        )}
      </div>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
};

export default StressManagement;