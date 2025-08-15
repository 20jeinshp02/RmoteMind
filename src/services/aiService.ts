// AI Service for therapist functionality
// This is a mock implementation - in production, you would integrate with GROK AI API or similar

export interface AIMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface AITherapistResponse {
  message: string;
  suggestions?: string[];
  mood?: 'supportive' | 'encouraging' | 'reflective' | 'empathetic';
}

class AIService {
  private therapistResponses = [
    {
      keywords: ['stress', 'stressed', 'overwhelmed', 'pressure'],
      responses: [
        "I understand you're feeling stressed. It's completely normal to feel overwhelmed sometimes, especially when working remotely. Can you tell me more about what's causing this stress?",
        "Stress can be challenging to manage. Let's explore some techniques that might help you feel more balanced. What usually helps you relax?",
        "I hear that you're under pressure. Remember, it's okay to take breaks and prioritize your well-being. What's one small thing you could do right now to ease this feeling?"
      ],
      suggestions: [
        "Try the 4-7-8 breathing technique",
        "Take a 5-minute walk outside",
        "Practice progressive muscle relaxation",
        "Write down three things you're grateful for"
      ]
    },
    {
      keywords: ['lonely', 'isolated', 'alone', 'disconnected'],
      responses: [
        "Feeling isolated while working remotely is very common. You're not alone in experiencing this. What connections do you miss most from your pre-remote work life?",
        "Loneliness can be particularly challenging for remote workers. Have you considered joining virtual coworking sessions or online communities related to your interests?",
        "I understand that sense of disconnection. Building meaningful connections while remote requires intentional effort. What's one way you could reach out to someone today?"
      ],
      suggestions: [
        "Schedule a virtual coffee chat with a colleague",
        "Join the RemoteMind community discussions",
        "Consider working from a coffee shop or coworking space",
        "Reach out to an old friend or family member"
      ]
    },
    {
      keywords: ['tired', 'exhausted', 'burnout', 'burnt out', 'fatigue'],
      responses: [
        "Burnout is a serious concern, and I'm glad you're recognizing these feelings. It takes courage to acknowledge when we're struggling. What does your current work-life balance look like?",
        "Exhaustion can be both physical and emotional. It sounds like you might need to prioritize rest and recovery. When was the last time you took a real break?",
        "Feeling burnt out is your mind and body telling you that something needs to change. Let's explore what boundaries you might need to set."
      ],
      suggestions: [
        "Set clear work hours and stick to them",
        "Take regular breaks throughout the day",
        "Practice saying 'no' to non-essential tasks",
        "Consider talking to your manager about workload"
      ]
    },
    {
      keywords: ['anxious', 'anxiety', 'worried', 'nervous', 'panic'],
      responses: [
        "Anxiety can feel overwhelming, but you're taking a positive step by talking about it. Can you describe what the anxiety feels like for you?",
        "I hear that you're feeling anxious. Anxiety often comes from uncertainty or feeling out of control. What specific situations tend to trigger these feelings?",
        "It's understandable to feel anxious, especially with the challenges of remote work. Let's work together to find some coping strategies that resonate with you."
      ],
      suggestions: [
        "Practice mindfulness meditation",
        "Try grounding techniques (5-4-3-2-1 method)",
        "Limit caffeine and news consumption",
        "Create a calming workspace environment"
      ]
    },
    {
      keywords: ['productive', 'productivity', 'focus', 'concentration', 'distracted'],
      responses: [
        "Productivity challenges are very common in remote work settings. What specific aspects of staying focused are most difficult for you?",
        "It sounds like you're looking to improve your focus. Creating structure and boundaries can really help. What does your current daily routine look like?",
        "Distractions at home can be challenging to manage. Let's explore some strategies to help you create a more focused work environment."
      ],
      suggestions: [
        "Use the Pomodoro Technique (25-min focused work sessions)",
        "Create a dedicated workspace",
        "Turn off non-essential notifications",
        "Set specific goals for each work session"
      ]
    }
  ];

  private generalResponses = [
    "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about how you're feeling?",
    "I appreciate you opening up. It takes strength to reach out for support. What would be most helpful for you right now?",
    "I hear you, and your feelings are valid. Sometimes just talking about what we're experiencing can be the first step toward feeling better.",
    "It sounds like you're going through a challenging time. Remember that seeking support is a sign of self-awareness and strength.",
    "I'm glad you're taking time to check in with yourself. What's one thing that's been on your mind lately?"
  ];

  async generateResponse(userMessage: string, _conversationHistory: AIMessage[]): Promise<AITherapistResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching response category
    const matchedCategory = this.therapistResponses.find(category => 
      category.keywords.some(keyword => lowerMessage.includes(keyword))
    );

    if (matchedCategory) {
      const randomResponse = matchedCategory.responses[Math.floor(Math.random() * matchedCategory.responses.length)];
      return {
        message: randomResponse,
        suggestions: matchedCategory.suggestions,
        mood: 'empathetic'
      };
    }

    // Fallback to general response
    const randomGeneral = this.generalResponses[Math.floor(Math.random() * this.generalResponses.length)];
    return {
      message: randomGeneral,
      mood: 'supportive'
    };
  }

  async getWelcomeMessage(): Promise<AITherapistResponse> {
    return {
      message: "Hello! I'm your AI therapy companion. I'm here to provide a safe, non-judgmental space where you can share your thoughts and feelings. Whether you're dealing with work stress, feeling isolated, or just need someone to talk to, I'm here to listen and support you. What's on your mind today?",
      mood: 'supportive'
    };
  }

  // In a real implementation, this would connect to GROK AI API or similar
  async connectToGrokAPI(_message: string): Promise<string> {
    // Placeholder for actual API integration
    throw new Error('GROK AI API integration not implemented yet');
  }
}

export const aiService = new AIService();
export default aiService;