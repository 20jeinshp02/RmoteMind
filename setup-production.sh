#!/bin/bash

# Production Setup Script for Remote Mind Wellness App
# This script helps set up the application for production deployment

echo "🚀 Remote Mind Wellness App - Production Setup"
echo "============================================="

# Check if .env.backend exists
if [ ! -f ".env.backend" ]; then
    echo "📋 Creating .env.backend from template..."
    cp .env.production .env.backend
    echo "✅ .env.backend created from template"
else
    echo "⚠️  .env.backend already exists"
fi

# Check if frontend .env exists
if [ ! -f ".env" ]; then
    echo "📋 Creating frontend .env file..."
    cat > .env << EOF
# Frontend Environment Variables
VITE_ENVIRONMENT=production
VITE_STRIPE_PUBLIC_KEY=pk_live_your_public_key_here
VITE_API_URL=https://your-backend-domain.com
VITE_WEBHOOK_URL=https://your-backend-domain.com/webhook
EOF
    echo "✅ Frontend .env created"
else
    echo "⚠️  Frontend .env already exists"
fi

echo ""
echo "📝 Next Steps:"
echo "1. Edit .env.backend and replace placeholder values with your actual Stripe keys"
echo "2. Edit .env and update API URLs to your production domains"
echo "3. Set up Stripe webhooks in your Stripe Dashboard"
echo "4. Deploy frontend to Vercel/Netlify"
echo "5. Deploy backend to Heroku/Railway/Render"
echo ""
echo "📚 See DEPLOYMENT_CHECKLIST.md for detailed instructions"
echo "🔒 Security: Never commit .env files to version control"
echo ""
echo "✨ Setup complete! Ready for production deployment."