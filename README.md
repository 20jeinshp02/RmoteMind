# RemoteMind

**Mental Health Support for Remote Workers**

RemoteMind is a comprehensive web application designed specifically to address the unique mental health challenges faced by remote workers. It provides a supportive community, stress management tools, and productivity aids to help remote workers thrive in their work-from-home environment.

## Features

### 🏠 **Home Page**
- Welcome landing page with app overview
- Feature highlights and benefits
- Community statistics and testimonials
- Call-to-action for getting started

### 👥 **Community Hub**
- **Social Feed**: Share experiences and connect with fellow remote workers
- **Support Groups**: Join specialized groups (Remote Parents, Digital Nomads, Night Owls, Wellness Warriors)
- **Events**: Participate in virtual meditation sessions, workshops, and coffee chats
- **Real-time Stats**: Active members, trending topics, and community engagement

### 🧘 **Stress Management & Wellness**
- **Breathing Exercises**: Guided breathing techniques (4-7-8, Box Breathing, Belly Breathing)
- **Guided Meditations**: Curated sessions for stress relief, focus, and work-life balance
- **Quick Wellness Tools**: Pomodoro timer, mood check-ins, stress monitoring, energy boosters
- **Progress Tracking**: Monitor your wellness journey with detailed analytics

### ⚡ **Productivity Tools**
- **Focus Timer**: Pomodoro technique with customizable work/break intervals
- **Task Management**: Daily task tracking with priority levels
- **Productivity Analytics**: Track focus sessions, completed tasks, and deep work hours
- **Weekly Goals**: Set and monitor productivity targets

### 👤 **User Profile**
- **Personal Dashboard**: Overview of wellness progress and achievements
- **Achievement System**: Earn badges for consistency and milestones
- **Activity History**: Track meditation sessions, community engagement, and productivity
- **Settings**: Customize notifications, time zone, and preferences

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **Routing**: React Router for navigation

## 🔒 Security Features

- **Environment Variable Protection**: All sensitive API keys are properly secured
- **Stripe Integration**: Secure payment processing with webhook validation
- **Input Validation**: Backend validation prevents startup with invalid credentials
- **Git Security**: All sensitive files are excluded from version control

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/20jeinshp02/RmoteMind.git
cd "trea remote mind 00"
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# For development, the app will show validation errors for missing keys
# This is intentional for security
```

4. Start development servers:
```bash
npm run dev          # Frontend (port 3000)
# Backend requires valid Stripe keys - see production setup
```

### Production Setup

1. Run the production setup script:
```bash
./setup-production.sh
```

2. Configure your Stripe keys in `.env.backend`
3. Update frontend URLs in `.env`
4. Follow the deployment checklist: `DEPLOYMENT_CHECKLIST.md`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `./setup-production.sh` - Set up production environment

## 🌐 Deployment

### Supported Platforms

**Frontend Deployment:**
- ✅ Vercel (Recommended)
- ✅ Netlify
- ✅ GitHub Pages

**Backend Deployment:**
- ✅ Heroku (Recommended)
- ✅ Railway
- ✅ Render
- ✅ DigitalOcean

### Quick Deploy

1. **Frontend to Vercel:**
   - Connect your GitHub repository
   - Set environment variables in Vercel dashboard
   - Deploy automatically on push

2. **Backend to Heroku:**
   - Create Heroku app
   - Set config vars (environment variables)
   - Deploy via Git or GitHub integration

See detailed deployment guides in the `/docs` folder.

## Design Philosophy

RemoteMind is built with the understanding that remote work presents unique challenges:

- **Isolation and Loneliness**: Addressed through community features and social connections
- **Work-Life Boundaries**: Managed with productivity tools and wellness practices
- **Stress and Burnout**: Mitigated through stress management tools and mindfulness exercises
- **Lack of Structure**: Supported with time management and goal-setting features

## Key Benefits

✅ **Reduce isolation and loneliness**
✅ **Improve work-life balance**
✅ **Build healthy remote work habits**
✅ **Connect with like-minded professionals**
✅ **Access 24/7 mental health resources**
✅ **Track wellness progress**

## Future Enhancements

- Integration with calendar applications
- AI-powered wellness recommendations
- Video chat capabilities for community events
- Mobile app development
- Integration with wearable devices for health tracking
- Employer dashboard for team wellness insights

## Contributing

We welcome contributions to make RemoteMind even better! Please feel free to submit issues, feature requests, or pull requests.

## License

This project is licensed under the MIT License.

---

**RemoteMind** - Empowering remote workers to thrive mentally, socially, and professionally. 🌟