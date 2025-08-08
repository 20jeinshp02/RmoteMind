import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  subscription: {
    plan: string;
    status: 'active' | 'cancelled' | 'past_due';
    currentPeriodEnd: string;
  };
  stats: {
    daysActive: number;
    meditationHours: number;
    communityPosts: number;
    wellnessScore: number;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data for demo purposes
  const mockUser: User = {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-01',
    subscription: {
      plan: 'Premium',
      status: 'active',
      currentPeriodEnd: '2024-12-31'
    },
    stats: {
      daysActive: 127,
      meditationHours: 45.2,
      communityPosts: 23,
      wellnessScore: 8.4
    }
  };

  // Admin account for testing all features
  const adminUser: User = {
    id: 'admin-001',
    email: 'admin@remotemind.com',
    name: 'Admin User',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-01',
    subscription: {
      plan: 'Premium',
      status: 'active',
      currentPeriodEnd: '2025-12-31'
    },
    stats: {
      daysActive: 365,
      meditationHours: 120.5,
      communityPosts: 89,
      wellnessScore: 9.8
    }
  };

  useEffect(() => {
    // Check for existing session on app load
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('remotemind_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would call your backend
      if (email === 'admin@remotemind.com' && password === 'admin123') {
        // Admin login
        setUser(adminUser);
        localStorage.setItem('remotemind_user', JSON.stringify(adminUser));
        return { success: true };
      } else if (email && password.length >= 6) {
        // Regular user login
        const userData = { ...mockUser, email };
        setUser(userData);
        localStorage.setItem('remotemind_user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - in real app, this would call your backend
      if (email && password.length >= 6 && name.trim()) {
        const userData: User = {
          ...mockUser,
          email,
          name,
          createdAt: new Date().toISOString(),
          subscription: {
            plan: 'Free',
            status: 'active',
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          },
          stats: {
            daysActive: 0,
            meditationHours: 0,
            communityPosts: 0,
            wellnessScore: 0
          }
        };
        setUser(userData);
        localStorage.setItem('remotemind_user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: 'Please fill in all fields correctly' };
      }
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('remotemind_user');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('remotemind_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};