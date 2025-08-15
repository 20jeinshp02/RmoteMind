#!/bin/bash

# 🚀 Render.com Quick Setup Script for RemoteMind Backend
# This script prepares your project for Render deployment

echo "🚀 Setting up RemoteMind for Render.com deployment..."
echo "================================================"

# Check if we're in the right directory
if [ ! -f "backend-example.js" ]; then
    echo "❌ Error: backend-example.js not found!"
    echo "Please run this script from your project root directory."
    exit 1
fi

# Create render.yaml for easier deployment configuration
echo "📝 Creating render.yaml configuration..."
cat > render.yaml << 'EOF'
services:
  - type: web
    name: remotemind-backend
    env: node
    plan: free
    buildCommand: npm install
    startCommand: node backend-example.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: CLIENT_URL
        value: https://your-domain.com  # Update this with your actual domain
      - key: STRIPE_SECRET_KEY
        value: sk_test_your_test_key_here  # Update with your test key
      - key: STRIPE_WEBHOOK_SECRET
        value: whsec_placeholder  # Will update after webhook setup
EOF

# Update package.json to ensure proper start script
echo "📦 Updating package.json..."
if [ -f "package.json" ]; then
    # Check if start script exists
    if ! grep -q '"start"' package.json; then
        echo "Adding start script to package.json..."
        # This is a simple approach - in production you might want to use jq
        sed -i '' 's/"scripts": {/"scripts": {\n    "start": "node backend-example.js",/' package.json
    fi
else
    echo "⚠️  Warning: package.json not found in root directory"
    echo "You may need to copy backend-package.json to package.json"
fi

# Ensure all changes are committed
echo "📋 Checking git status..."
if [ -d ".git" ]; then
    echo "Git repository detected. Checking for uncommitted changes..."
    
    if ! git diff-index --quiet HEAD --; then
        echo "📝 Uncommitted changes detected. Staging and committing..."
        git add .
        git commit -m "Prepare for Render.com deployment - Add render.yaml and update scripts"
        echo "✅ Changes committed successfully!"
    else
        echo "✅ No uncommitted changes found."
    fi
    
    echo "🔄 Pushing to GitHub..."
    git push origin main
    echo "✅ Code pushed to GitHub successfully!"
else
    echo "⚠️  Warning: Not a git repository. Please initialize git and push to GitHub first."
fi

# Create environment variables template
echo "📋 Creating .env.render template..."
cat > .env.render << 'EOF'
# Render.com Environment Variables Template
# Copy these to your Render service settings

NODE_ENV=production
PORT=10000
CLIENT_URL=https://your-domain.com
STRIPE_SECRET_KEY=sk_test_your_test_key_here
STRIPE_WEBHOOK_SECRET=whsec_placeholder

# Instructions:
# 1. Replace 'your-domain.com' with your actual domain
# 2. Replace 'sk_test_your_test_key_here' with your Stripe test secret key
# 3. Update STRIPE_WEBHOOK_SECRET after creating webhook in Stripe
EOF

echo ""
echo "🎉 Setup Complete! Next Steps:"
echo "================================"
echo ""
echo "1. 🌐 Go to https://render.com and sign up with GitHub"
echo "2. 🔗 Create new Web Service and connect your repository"
echo "3. ⚙️  Configure service settings:"
echo "   - Runtime: Node"
echo "   - Build Command: npm install"
echo "   - Start Command: node backend-example.js"
echo "4. 🔧 Add environment variables from .env.render file"
echo "5. 🚀 Deploy your service"
echo "6. 🔗 Add your custom domain in Render dashboard"
echo "7. 🧪 Test with: node test-backend.js https://your-app.onrender.com"
echo ""
echo "📖 For detailed instructions, see: RENDER_DEPLOYMENT_GUIDE.md"
echo ""
echo "✅ Your project is now ready for Render deployment!"
echo "💰 Total cost: $0 (completely free!)"