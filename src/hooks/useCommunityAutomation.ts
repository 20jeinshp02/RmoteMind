import { useState, useEffect, useCallback } from 'react';
import { 
  communityAutomation, 
  AutoPost, 
  AutoGroup, 
  AutoEvent, 
  UserPreferences 
} from '../services/communityAutomation';
import { useAuth } from '../contexts/AuthContext';

export interface CommunityState {
  posts: AutoPost[];
  groups: AutoGroup[];
  events: AutoEvent[];
  isLoading: boolean;
  insights: any;
}

export interface CommunityActions {
  refreshContent: () => void;
  generateNewPosts: (count?: number) => void;
  suggestGroups: () => void;
  scheduleEvents: () => void;
  moderateContent: (content: string) => { approved: boolean; reason?: string; suggestions?: string[] };
  joinGroup: (groupId: string) => void;
  joinEvent: (eventId: string) => void;
  createPost: (content: string, tags: string[]) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
}

export const useCommunityAutomation = () => {
  const { user } = useAuth();
  const [state, setState] = useState<CommunityState>({
    posts: [],
    groups: [],
    events: [],
    isLoading: true,
    insights: null
  });

  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    interests: ['remote-work', 'productivity', 'wellness'],
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    availableHours: ['09:00', '12:00', '15:00', '18:00'],
    groupTypes: ['professional', 'wellness', 'social'],
    eventTypes: ['workshop', 'discussion', 'wellness'],
    engagementLevel: 'medium'
  });

  // Initialize automation service
  useEffect(() => {
    const initializeAutomation = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      
      try {
        // Initialize with user preferences
        communityAutomation.initialize(userPreferences);
        
        // Get initial content
        const posts = communityAutomation.getPosts();
        const groups = communityAutomation.getGroups();
        const events = communityAutomation.getEvents();
        const insights = communityAutomation.getCommunityInsights();
        
        setState({
          posts,
          groups,
          events,
          insights,
          isLoading: false
        });
      } catch (error) {
        console.error('Failed to initialize community automation:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAutomation();
  }, [userPreferences]);

  // Auto-refresh content periodically
  useEffect(() => {
    const interval = setInterval(() => {
      refreshContent();
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Refresh all content
  const refreshContent = useCallback(() => {
    const posts = communityAutomation.getPosts();
    const groups = communityAutomation.getGroups();
    const events = communityAutomation.getEvents();
    const insights = communityAutomation.getCommunityInsights();
    
    setState(prev => ({
      ...prev,
      posts,
      groups,
      events,
      insights
    }));
  }, []);

  // Generate new automated posts
  const generateNewPosts = useCallback((count: number = 3) => {
    const newPosts = communityAutomation.generateAutomatedPosts(count);
    setState(prev => ({
      ...prev,
      posts: [...newPosts, ...prev.posts]
    }));
  }, []);

  // Get group suggestions based on user activity
  const suggestGroups = useCallback(() => {
    const userActivity = user ? [
      ...userPreferences.interests,
      'remote-work',
      'productivity'
    ] : ['general'];
    
    const suggestions = communityAutomation.suggestGroups(userActivity);
    setState(prev => ({
      ...prev,
      groups: [...suggestions, ...prev.groups.filter(g => !suggestions.find(s => s.id === g.id))]
    }));
  }, [user, userPreferences]);

  // Schedule new automated events
  const scheduleEvents = useCallback(() => {
    const newEvents = communityAutomation.scheduleAutomatedEvents();
    setState(prev => ({
      ...prev,
      events: [...newEvents, ...prev.events]
    }));
  }, []);

  // Moderate content before posting
  const moderateContent = useCallback((content: string) => {
    return communityAutomation.moderateContent(content);
  }, []);

  // Join a group
  const joinGroup = useCallback((groupId: string) => {
    setState(prev => ({
      ...prev,
      groups: prev.groups.map(group => 
        group.id === groupId 
          ? { ...group, members: group.members + 1 }
          : group
      )
    }));
    
    // Update user preferences based on group tags
    const group = state.groups.find(g => g.id === groupId);
    if (group) {
      setUserPreferences(prev => ({
        ...prev,
        interests: [...new Set([...prev.interests, ...group.tags])]
      }));
    }
  }, [state.groups]);

  // Join an event
  const joinEvent = useCallback((eventId: string) => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(event => 
        event.id === eventId 
          ? { ...event, attendees: event.attendees + 1 }
          : event
      )
    }));
  }, []);

  // Create a new post
  const createPost = useCallback((content: string, tags: string[]) => {
    const moderation = moderateContent(content);
    
    if (!moderation.approved) {
      throw new Error(moderation.reason || 'Content not approved');
    }

    const newPost: AutoPost = {
      id: `user-${Date.now()}`,
      author: user?.name || 'Anonymous',
      avatar: user?.avatar || '👤',
      time: 'Just now',
      content,
      likes: 0,
      comments: 0,
      tags,
      type: 'user',
      engagement: 0
    };

    setState(prev => ({
      ...prev,
      posts: [newPost, ...prev.posts]
    }));
  }, [user, moderateContent]);

  // Update user preferences
  const updatePreferences = useCallback((prefs: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({ ...prev, ...prefs }));
  }, []);

  // Smart content filtering based on user preferences
  const getFilteredContent = useCallback(() => {
    const filteredPosts = state.posts.filter(post => {
      if (userPreferences.engagementLevel === 'low') {
        return post.engagement > 0.3;
      } else if (userPreferences.engagementLevel === 'high') {
        return post.engagement > 0.7;
      }
      return true;
    });

    const filteredGroups = state.groups.filter(group => {
      return userPreferences.groupTypes.includes(group.category) ||
             group.tags.some(tag => userPreferences.interests.includes(tag));
    });

    const filteredEvents = state.events.filter(event => {
      return userPreferences.eventTypes.includes(event.type);
    });

    return {
      posts: filteredPosts,
      groups: filteredGroups,
      events: filteredEvents
    };
  }, [state, userPreferences]);

  // Get trending content
  const getTrendingContent = useCallback(() => {
    const trendingPosts = state.posts
      .filter(post => post.engagement > 0.6)
      .sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments))
      .slice(0, 5);

    const trendingGroups = state.groups
      .filter(group => group.activity === 'high')
      .sort((a, b) => b.members - a.members)
      .slice(0, 3);

    const upcomingEvents = state.events
      .filter(event => new Date(event.time) > new Date())
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
      .slice(0, 5);

    return {
      posts: trendingPosts,
      groups: trendingGroups,
      events: upcomingEvents
    };
  }, [state]);

  // Get personalized recommendations
  const getRecommendations = useCallback(() => {
    const userInterests = userPreferences.interests;
    
    const recommendedGroups = state.groups
      .filter(group => 
        group.tags.some(tag => userInterests.includes(tag)) &&
        !group.autoJoin
      )
      .slice(0, 3);

    const recommendedEvents = state.events
      .filter(event => 
        event.tags.some(tag => userInterests.includes(tag)) &&
        new Date(event.time) > new Date()
      )
      .slice(0, 3);

    return {
      groups: recommendedGroups,
      events: recommendedEvents
    };
  }, [state, userPreferences]);

  // Analytics for community managers
  const getAnalytics = useCallback(() => {
    const totalEngagement = state.posts.reduce((sum, post) => 
      sum + post.likes + post.comments, 0
    );
    
    const averageEngagement = totalEngagement / state.posts.length || 0;
    
    const activeGroups = state.groups.filter(group => group.activity === 'high').length;
    
    const upcomingEvents = state.events.filter(event => 
      new Date(event.time) > new Date()
    ).length;

    const automatedContent = state.posts.filter(post => 
      post.type === 'automated'
    ).length;

    return {
      totalPosts: state.posts.length,
      totalGroups: state.groups.length,
      totalEvents: state.events.length,
      averageEngagement,
      activeGroups,
      upcomingEvents,
      automatedContent,
      automationRate: automatedContent / state.posts.length || 0
    };
  }, [state]);

  const actions: CommunityActions = {
    refreshContent,
    generateNewPosts,
    suggestGroups,
    scheduleEvents,
    moderateContent,
    joinGroup,
    joinEvent,
    createPost,
    updatePreferences
  };

  return {
    ...state,
    userPreferences,
    actions,
    getFilteredContent,
    getTrendingContent,
    getRecommendations,
    getAnalytics
  };
};