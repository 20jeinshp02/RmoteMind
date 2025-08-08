import React, { createContext, useContext, useState, useEffect } from 'react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

interface SubscriptionContextType {
  currentPlan: string | null;
  isTrialActive: boolean;
  trialDaysLeft: number;
  subscriptionPlans: SubscriptionPlan[];
  hasAccess: (feature: string) => boolean;
  getAITherapistLimit: () => number;
  upgradePlan: (planId: string) => void;
  startTrial: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Basic mood tracking (limited history)',
      'Access to 3 guided meditation sessions',
      'Community read-only access',
      'Daily mental health tip',
      'Work-life boundary reminders',
      'AI Therapist (2 sessions/month)'
    ]
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 7.99,
    features: [
      'Full mood tracking history and analytics',
      'Unlimited access to meditation library (20+ sessions)',
      'Community participation (posting & commenting)',
      'Basic workspace analytics',
      'Personalized wellness recommendations',
      'Work schedule management',
      'Weekly progress reports',
      'AI Therapist (5 sessions/month)'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 14.99,
    isPopular: true,
    features: [
      'All Basic features',
      'Advanced burnout prevention tools',
      'AI-powered work-life balance coach',
      'Unlimited journaling with sentiment analysis',
      'Team wellness features (anonymous team pulse)',
      'Priority access to new features',
      'Premium community groups',
      'Monthly wellness assessments',
      'Virtual coworking sessions',
      'AI Therapist (15 sessions/month)',
      'Export data and reports'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99.99,
    features: [
      'All Premium features',
      'Team management dashboard',
      'Company-wide analytics (anonymized)',
      'Custom integrations with workplace tools',
      'Team challenges and wellness programs',
      'Dedicated customer success manager',
      'Custom content and resources',
      'Unlimited AI Therapist sessions',
      'White-labeled option'
    ]
  }
];

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState<string | null>('trial');
  const [isTrialActive, setIsTrialActive] = useState(true);
  const [trialDaysLeft, setTrialDaysLeft] = useState(3);

  useEffect(() => {
    // Simulate trial countdown
    const trialStart = localStorage.getItem('trialStart');
    if (!trialStart) {
      localStorage.setItem('trialStart', Date.now().toString());
    } else {
      const daysPassed = Math.floor((Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24));
      const daysLeft = Math.max(0, 3 - daysPassed);
      setTrialDaysLeft(daysLeft);
      if (daysLeft === 0) {
        setIsTrialActive(false);
        setCurrentPlan(null);
      }
    }
  }, []);

  const hasAccess = (feature: string): boolean => {
    if (isTrialActive) return true;
    
    const featureAccess: Record<string, string[]> = {
      'breathing': ['basic', 'premium', 'enterprise'],
      'meditation': ['free', 'basic', 'premium', 'enterprise'],
      'meditation_unlimited': ['basic', 'premium', 'enterprise'],
      'community_read': ['free', 'basic', 'premium', 'enterprise'],
      'community_post': ['basic', 'premium', 'enterprise'],
      'mood_tracking': ['free', 'basic', 'premium', 'enterprise'],
      'mood_tracking_full': ['basic', 'premium', 'enterprise'],
      'ai_therapist_limited': ['premium'],
      'ai_therapist_unlimited': ['enterprise'],
      'analytics': ['basic', 'premium', 'enterprise'],
      'advanced_analytics': ['premium', 'enterprise'],
      'team_features': ['premium', 'enterprise'],
      'custom_integrations': ['enterprise']
    };
    
    return featureAccess[feature]?.includes(currentPlan || 'free') || false;
  };
  
  const getAITherapistLimit = (): number => {
    if (isTrialActive) return 3;
    if (currentPlan === 'free') return 2;
    if (currentPlan === 'basic') return 5;
    if (currentPlan === 'premium') return 15;
    if (currentPlan === 'enterprise') return -1; // unlimited
    return 0;
  };

  const upgradePlan = (planId: string) => {
    setCurrentPlan(planId);
    setIsTrialActive(false);
    localStorage.setItem('currentPlan', planId);
  };

  const startTrial = () => {
    setIsTrialActive(true);
    setTrialDaysLeft(3);
    setCurrentPlan('trial');
    localStorage.setItem('trialStart', Date.now().toString());
  };

  return (
    <SubscriptionContext.Provider value={{
      currentPlan,
      isTrialActive,
      trialDaysLeft,
      subscriptionPlans,
      hasAccess,
      getAITherapistLimit,
      upgradePlan,
      startTrial
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};