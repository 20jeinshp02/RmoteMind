#!/bin/bash

# Stripe Keys Setup Script
# This script helps you configure your Stripe test keys for local development

echo "🔑 Stripe Keys Setup for Local Development"
echo "==========================================="
echo ""
echo "You need to get your Stripe test keys from:"
echo "https://dashboard.stripe.com/test/apikeys"
echo ""
echo "Make sure you're in TEST MODE (toggle in top-left of Stripe dashboard)"
echo ""

# Get Stripe Public Key
echo "📋 Step 1: Enter your Stripe TEST Public Key"
echo "(starts with pk_test_...)"
read -p "Public Key: " STRIPE_PUBLIC_KEY

# Get Stripe Secret Key
echo ""
echo "📋 Step 2: Enter your Stripe TEST Secret Key"
echo "(starts with sk_test_...)"
read -p "Secret Key: " STRIPE_SECRET_KEY

# Get Webhook Secret (optional)
echo ""
echo "📋 Step 3: Enter your Webhook Secret (optional for now)"
echo "(starts with whsec_... - you can set this later)"
read -p "Webhook Secret (or press Enter to skip): " STRIPE_WEBHOOK_SECRET

# Set default webhook secret if empty
if [ -z "$STRIPE_WEBHOOK_SECRET" ]; then
    STRIPE_WEBHOOK_SECRET="whsec_placeholder_for_local_testing"
fi

# Validate inputs
if [[ ! $STRIPE_PUBLIC_KEY =~ ^pk_test_ ]]; then
    echo "❌ Error: Public key should start with 'pk_test_'"
    exit 1
fi

if [[ ! $STRIPE_SECRET_KEY =~ ^sk_test_ ]]; then
    echo "❌ Error: Secret key should start with 'sk_test_'"
    exit 1
fi

# Update frontend .env file
echo ""
echo "📝 Updating frontend configuration (.env)..."
cat > .env << EOF
# Stripe Configuration
# Test public key (safe to expose in frontend)
# Get your key from: https://dashboard.stripe.com/test/apikeys
VITE_STRIPE_PUBLIC_KEY=$STRIPE_PUBLIC_KEY

# Private key removed - should only be in backend environment

# API Configuration
VITE_API_URL=http://localhost:3001/api
VITE_STRIPE_WEBHOOK_URL=http://localhost:3001/webhook/stripe

# Environment
VITE_ENVIRONMENT=production
EOF

# Update backend .env.backend file
echo "📝 Updating backend configuration (.env.backend)..."
cat > .env.backend << EOF
# Backend Environment Variables
# Stripe Configuration (Test Keys for Development)
# Replace these with your actual Stripe test keys from dashboard
# Get your keys from: https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET

# Server Configuration
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Environment
NODE_ENV=development
EOF

echo ""
echo "✅ Configuration complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Start the backend server: node backend-example.js"
echo "2. Start the frontend server: npm run dev"
echo "3. Open http://localhost:3000 to test payments"
echo ""
echo "💳 Use test card: 4242 4242 4242 4242"
echo "📖 See TESTING_GUIDE.md for more details"
echo ""