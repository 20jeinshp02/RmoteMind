import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  Plus, 
  Users, 
  Calendar,
  MapPin,
  Clock,
  Bookmark,
  Zap,
  TrendingUp,
  Bot,
  Sparkles,
  RefreshCw,
  Settings,
  Filter,
  BarChart3
} from 'lucide-react';
import { useCommunityAutomation } from '../hooks/useCommunityAutomation';
import { useAuth } from '../contexts/AuthContext';

const Community = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');
  const [showAutomationPanel, setShowAutomationPanel] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'trending' | 'personalized'>('all');
  
  const {
    posts,
    groups,
    events,
    isLoading,
    insights,
    userPreferences,
    actions,
    getFilteredContent,
    getTrendingContent,
    getRecommendations,
    getAnalytics
  } = useCommunityAutomation();

  const [displayContent, setDisplayContent] = useState<{
    posts: any[];
    groups: any[];
    events: any[];
  }>({ posts: [], groups: [], events: [] });

  useEffect(() => {
    if (filterMode === 'trending') {
      setDisplayContent(getTrendingContent());
    } else if (filterMode === 'personalized') {
      setDisplayContent(getFilteredContent());
    } else {
      setDisplayContent({ posts, groups, events });
    }
  }, [filterMode, posts, groups, events, getTrendingContent, getFilteredContent]);

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const tags = newPostTags.split(',').map(tag => tag.trim()).filter(Boolean);
      actions.createPost(
        newPostContent,
        tags.length > 0 ? tags : ['user-post']
      );
      setNewPostContent('');
      setNewPostTags('');
    }
  };

  const formatEventTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      const now = new Date();
      const diffTime = date.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Tomorrow';
      if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
      
      return date.toLocaleDateString();
    } catch {
      return timeString;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading community content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Community Hub
            </h1>
            <Sparkles className="w-8 h-8 text-primary-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            AI-powered community with automated content, smart groups, and personalized events.
          </p>
          
          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
              <Filter className="w-4 h-4 text-gray-500" />
              <select 
                value={filterMode} 
                onChange={(e) => setFilterMode(e.target.value as any)}
                className="border-none bg-transparent text-sm focus:outline-none"
              >
                <option value="all">All Content</option>
                <option value="trending">Trending</option>
                <option value="personalized">Personalized</option>
              </select>
            </div>
            
            <button
              onClick={() => actions.generateNewPosts(3)}
              className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Bot className="w-4 h-4" />
              Generate Content
            </button>
            
            <button
              onClick={() => setShowAutomationPanel(!showAutomationPanel)}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Automation
            </button>
          </div>
          
          {/* Automation Panel */}
          {showAutomationPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg p-6 shadow-lg mb-6 max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Smart Analytics</h3>
                  <p className="text-sm text-gray-600 mb-3">AI-powered insights and recommendations</p>
                  <div className="text-xs text-gray-500">
                    <div>Engagement: {getAnalytics().averageEngagement.toFixed(1)}</div>
                    <div>Automation: {(getAnalytics().automationRate * 100).toFixed(0)}%</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Auto Groups</h3>
                  <p className="text-sm text-gray-600 mb-3">Intelligent group suggestions</p>
                  <button
                    onClick={actions.suggestGroups}
                    className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
                  >
                    Refresh Suggestions
                  </button>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Smart Events</h3>
                  <p className="text-sm text-gray-600 mb-3">Automated event scheduling</p>
                  <button
                    onClick={actions.scheduleEvents}
                    className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    Schedule Events
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            {[
              { key: 'feed', label: 'Feed', icon: MessageCircle },
              { key: 'groups', label: 'Groups', icon: Users },
              { key: 'events', label: 'Events', icon: Calendar }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === key
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'feed' && (
              <div className="space-y-6">
                {/* Create Post */}
                <div className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 space-y-3">
                      <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Share your remote work experience..."
                        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                        rows={3}
                      />
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={newPostTags}
                          onChange={(e) => setNewPostTags(e.target.value)}
                          placeholder="Tags (comma separated)"
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <button 
                          onClick={handleCreatePost}
                          disabled={!newPostContent.trim()}
                          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Posts */}
                {displayContent.posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{post.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{post.author}</h3>
                          {post.type === 'automated' && (
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <Bot className="w-3 h-3" />
                              Auto
                            </span>
                          )}
                          <span className="text-gray-500 text-sm">{post.time}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-6 text-gray-500">
                          <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                            <Share2 className="w-4 h-4" />
                            Share
                          </button>
                          <button className="flex items-center gap-2 hover:text-yellow-500 transition-colors">
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'groups' && (
              <div className="space-y-6">
                {/* Group Recommendations */}
                {getRecommendations().groups.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">Recommended Groups</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {getRecommendations().groups.map((group, index) => (
                        <motion.div
                          key={group.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold ${
                              group.color || 'bg-primary-500'
                            }`}>
                              {group.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{group.name}</h4>
                              <p className="text-sm text-gray-600">{group.members} members</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">{group.description}</p>
                          <button 
                            onClick={() => actions.joinGroup(group.id)}
                            className="text-sm bg-primary-100 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-200 transition-colors w-full"
                          >
                            Join Group
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Groups */}
                <div className="grid md:grid-cols-2 gap-6">
                  {displayContent.groups.map((group, index) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold ${
                          group.color || 'bg-primary-500'
                        }`}>
                          {group.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{group.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{group.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <Users className="w-4 h-4" />
                              <span>{group.members.toLocaleString()} members</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {group.tags.slice(0, 2).map((tag: string) => (
                                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => actions.joinGroup(group.id)}
                        className="btn btn-outline w-full mt-4"
                      >
                        Join Group
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-6">
                {/* Event Recommendations */}
                {getRecommendations().events.length > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-gray-900">Recommended Events</h3>
                    </div>
                    <div className="space-y-3">
                      {getRecommendations().events.map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                              <div className="flex items-center gap-4 text-gray-600 text-sm">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{formatEventTime(event.time)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span>{event.attendees} attending</span>
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => actions.joinEvent(event.id)}
                              className="text-sm bg-primary-100 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-200 transition-colors"
                            >
                              Join
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* All Events */}
                <div className="space-y-4">
                  {displayContent.events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                            {event.autoGenerated && (
                              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <Bot className="w-3 h-3" />
                                Auto
                              </span>
                            )}
                            {event.recurring && (
                              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                Recurring
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                          <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatEventTime(event.time)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{event.attendees} attending</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {event.duration} min
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              event.type === 'wellness' ? 'bg-green-100 text-green-700' :
                              event.type === 'workshop' ? 'bg-blue-100 text-blue-700' :
                              event.type === 'discussion' ? 'bg-yellow-100 text-yellow-700' :
                              event.type === 'networking' ? 'bg-purple-100 text-purple-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {event.type}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              event.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                              event.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {event.difficulty}
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => actions.joinEvent(event.id)}
                          className="btn btn-primary"
                        >
                          Join Event
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Analytics */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-primary-500" />
                <h3 className="font-semibold text-gray-900">AI Analytics</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Posts</span>
                  <span className="font-semibold">{getAnalytics().totalPosts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Groups</span>
                  <span className="font-semibold">{getAnalytics().activeGroups}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upcoming Events</span>
                  <span className="font-semibold text-green-600">{getAnalytics().upcomingEvents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Engagement</span>
                  <span className="font-semibold">{getAnalytics().averageEngagement.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Auto Content</span>
                  <span className="font-semibold text-blue-600">{(getAnalytics().automationRate * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* Smart Insights */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-gray-900">Smart Insights</h3>
              </div>
              <div className="space-y-3">
                {insights?.recommendations?.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{rec}</span>
                  </div>
                )) || [
                  'Increase wellness content',
                  'Schedule interactive workshops',
                  'Promote group collaboration'
                ].map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Connections */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Suggested Connections</h3>
              <div className="space-y-3">
                {['Alex Johnson', 'Maria Garcia', 'David Kim'].map((name) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-gray-900">{name}</span>
                    </div>
                    <button className="text-primary-600 text-sm hover:text-primary-700">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;