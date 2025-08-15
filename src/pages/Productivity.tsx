import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  Calendar,
  CheckSquare,
  Play,
  Pause,
  RotateCcw,
  Plus,
  BarChart3,
  Timer
} from 'lucide-react';

const Productivity = () => {
  const [activeTimer, setActiveTimer] = useState('pomodoro');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds

  const timerTypes = [
    { id: 'pomodoro', name: 'Pomodoro', duration: 25, color: 'bg-red-500' },
    { id: 'short-break', name: 'Short Break', duration: 5, color: 'bg-green-500' },
    { id: 'long-break', name: 'Long Break', duration: 15, color: 'bg-blue-500' },
    { id: 'deep-work', name: 'Deep Work', duration: 90, color: 'bg-purple-500' }
  ];

  const todayTasks = [
    { id: 1, title: 'Review project proposal', completed: true, priority: 'high' },
    { id: 2, title: 'Team standup meeting', completed: true, priority: 'medium' },
    { id: 3, title: 'Update documentation', completed: false, priority: 'medium' },
    { id: 4, title: 'Code review for feature X', completed: false, priority: 'high' },
    { id: 5, title: 'Plan next sprint', completed: false, priority: 'low' }
  ];

  const productivityStats = [
    { label: 'Focus Sessions Today', value: '6', change: '+2' },
    { label: 'Tasks Completed', value: '12', change: '+4' },
    { label: 'Deep Work Hours', value: '4.5', change: '+1.2' },
    { label: 'Productivity Score', value: '87%', change: '+5%' }
  ];

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Productivity & Focus Tools
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Boost your productivity with time management techniques, task tracking, 
            and focus tools designed specifically for remote workers.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timer Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pomodoro Timer */}
            <section className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Focus Timer</h2>
              
              {/* Timer Type Selection */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {timerTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setActiveTimer(type.id);
                      setTimeLeft(type.duration * 60);
                      setIsRunning(false);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTimer === type.id
                        ? `${type.color} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>

              {/* Timer Display */}
              <div className="text-center mb-8">
                <div className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">
                  {formatTime(timeLeft)}
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="btn btn-primary text-lg px-8 py-3"
                  >
                    {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={() => {
                      const currentType = timerTypes.find(t => t.id === activeTimer);
                      setTimeLeft((currentType?.duration || 25) * 60);
                      setIsRunning(false);
                    }}
                    className="btn btn-outline text-lg px-8 py-3"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    timerTypes.find(t => t.id === activeTimer)?.color || 'bg-red-500'
                  }`}
                  style={{ 
                    width: `${(() => {
                      const currentType = timerTypes.find(t => t.id === activeTimer);
                      const duration = (currentType?.duration || 25) * 60;
                      return ((duration - timeLeft) / duration) * 100;
                    })()}%` 
                  }}
                ></div>
              </div>
            </section>

            {/* Today's Tasks */}
            <section className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Today's Tasks</h2>
                <button className="btn btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </button>
              </div>
              
              <div className="space-y-3">
                {todayTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 border-l-4 rounded-r-lg ${getPriorityColor(task.priority)}`}
                  >
                    <div className="flex items-center gap-3">
                      <button className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        task.completed 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 hover:border-green-500'
                      }`}>
                        {task.completed && <CheckSquare className="w-3 h-3" />}
                      </button>
                      <span className={`flex-1 ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Productivity Stats */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Today's Progress
              </h3>
              <div className="space-y-4">
                {productivityStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                      <div className="font-semibold text-gray-900">{stat.value}</div>
                    </div>
                    <div className="text-green-600 text-sm font-medium">{stat.change}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn btn-outline text-left">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Focus Block
                </button>
                <button className="w-full btn btn-outline text-left">
                  <Target className="w-4 h-4 mr-2" />
                  Set Daily Goals
                </button>
                <button className="w-full btn btn-outline text-left">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </button>
                <button className="w-full btn btn-outline text-left">
                  <Timer className="w-4 h-4 mr-2" />
                  Time Tracking
                </button>
              </div>
            </div>

            {/* Weekly Overview */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Focus Sessions</span>
                  <span className="font-semibold">28/35</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-semibold">42/50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-600">Deep Work Hours</span>
                  <span className="font-semibold">18/25</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
            </div>

            {/* Productivity Tips */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">💡 Today's Tip</h3>
              <p className="text-gray-600 text-sm mb-3">
                Try the "Two-Minute Rule": If a task takes less than two minutes, do it immediately instead of adding it to your to-do list.
              </p>
              <button className="text-primary-600 text-sm hover:text-primary-700">
                More Tips →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productivity;