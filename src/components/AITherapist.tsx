import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Brain, 
  Lock
} from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import SubscriptionModal from './SubscriptionModal';
import { aiService, AIMessage } from '../services/aiService';

// Using AIMessage from aiService instead of local interface
type Message = AIMessage;

interface AITherapistProps {
  onClose?: () => void;
}

const AITherapist: React.FC<AITherapistProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionsUsed, setSessionsUsed] = useState(0);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { hasAccess, getAITherapistLimit, isTrialActive } = useSubscription();
  const sessionLimit = getAITherapistLimit();
  const hasAIAccess = hasAccess('ai_therapist_limited') || hasAccess('ai_therapist_unlimited');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize welcome message
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const welcomeResponse = await aiService.getWelcomeMessage();
        const welcomeMessage: Message = {
          id: '1',
          content: welcomeResponse.message,
          isUser: false,
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      } catch (error) {
        console.error('Error initializing chat:', error);
        // Fallback welcome message
        const fallbackMessage: Message = {
          id: '1',
          content: "Hello! I'm your AI therapy companion. How can I support you today?",
          isUser: false,
          timestamp: new Date()
        };
        setMessages([fallbackMessage]);
      }
    };
    
    initializeChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI response generation is now handled by the aiService

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Check access and session limits
    if (!hasAIAccess && !isTrialActive) {
      setShowSubscriptionModal(true);
      return;
    }
    
    if (sessionLimit !== -1 && sessionsUsed >= sessionLimit) {
      setShowSubscriptionModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Get AI response using the AI service
    try {
      const aiResponse = await aiService.generateResponse(inputMessage, messages);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.message,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Increment session count for limited plans
      if (sessionLimit !== -1) {
        setSessionsUsed(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">AI Therapist</h2>
              <p className="text-sm text-gray-600">Your personal mental health companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {sessionLimit !== -1 && (
              <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {sessionsUsed}/{sessionLimit} sessions
              </div>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-3 ${
                message.isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!message.isUser && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 shadow-sm'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.isUser ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              {message.isUser && (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white px-4 py-2 rounded-2xl shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        {(!hasAIAccess && !isTrialActive) || (sessionLimit !== -1 && sessionsUsed >= sessionLimit) ? (
          <div className="text-center py-4">
            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-3">
              {!hasAIAccess && !isTrialActive 
                ? "Upgrade to access AI Therapist sessions"
                : "You've reached your session limit for this month"
              }
            </p>
            <button
              onClick={() => setShowSubscriptionModal(true)}
              className="btn btn-primary"
            >
              Upgrade Plan
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="btn btn-primary px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
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

export default AITherapist;