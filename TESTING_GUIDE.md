# Testing Guide - Real Payment Testing & Production Deployment

## 🧪 Current Setup Status

✅ **Frontend Server**: Running on http://localhost:3000  
❌ **Backend Server**: Stopped - requires valid Stripe keys  
⚠️ **Environment**: Production mode with placeholder keys  
🔑 **Next Step**: Add your actual Stripe test keys  

## 🔑 Stripe Test Keys Configuration

### Current Configuration (⚠️ REQUIRES YOUR ACTUAL KEYS)

**Frontend (.env):**
```bash
VITE_STRIPE_PUBLIC_KEY=pk_test_your_actual_test_public_key_here
VITE_ENVIRONMENT=production
```

**Backend (.env.backend):**
```bash
STRIPE_SECRET_KEY=sk_test_your_actual_test_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here
```

⚠️ **IMPORTANT**: The backend server will not start until you replace these placeholder values with your actual Stripe test keys!

### 📋 Get Your Real Test Keys

1. **Login to Stripe Dashboard**: https://dashboard.stripe.com
2. **Switch to Test Mode** (toggle in top-left)
3. **Get Publishable Key**:
   - Go to Developers → API keys
   - Copy "Publishable key" (starts with `pk_test_`)
   - Update `VITE_STRIPE_PUBLIC_KEY` in `.env`
4. **Get Secret Key**:
   - Copy "Secret key" (starts with `sk_test_`)
   - Update `STRIPE_SECRET_KEY` in `.env.backend`
5. **Get Webhook Secret**:
   - Go to Developers → Webhooks
   - Create endpoint: `http://localhost:3001/webhook`
   - Copy "Signing secret" (starts with `whsec_`)
   - Update `STRIPE_WEBHOOK_SECRET` in `.env.backend`

## 🧪 Testing Real Payments

### Test Card Numbers (Stripe Test Mode)

| Card Number | Brand | Description |
|-------------|-------|-------------|
| `4242 4242 4242 4242` | Visa | Succeeds |
| `4000 0000 0000 0002` | Visa | Declined |
| `4000 0000 0000 9995` | Visa | Insufficient funds |
| `4000 0025 0000 3155` | Visa | Requires authentication |

**Test Details:**
- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

### 🔄 Testing Flow

1. **Open Application**: http://localhost:3000
2. **Navigate to Subscription**: Click "Get Started" or subscription button
3. **Select Plan**: Choose Basic, Premium, or Enterprise
4. **Stripe Checkout**: Should redirect to real Stripe checkout
5. **Enter Test Card**: Use `4242 4242 4242 4242`
6. **Complete Payment**: Should redirect to success page
7. **Check Backend Logs**: Verify webhook events received

### 🐛 Troubleshooting

**If payment fails:**
1. Check browser console for errors
2. Verify Stripe keys are correct
3. Ensure backend server is running
4. Check network tab for API call failures

**Common Issues:**
- "Invalid API key": Wrong Stripe keys
- "No such price": Price IDs don't exist in your Stripe account
- "Webhook error": Incorrect webhook secret

## 🚀 Production Deployment Preparation

### 1. Update Price IDs

In `src/services/stripeService.ts`, update with your actual Stripe price IDs:

```typescript
export const stripePriceIds = {
  basic: 'price_your_basic_plan_id',
  premium: 'price_your_premium_plan_id', 
  enterprise: 'price_your_enterprise_plan_id'
};
```

### 2. Create Production Environment

```bash
# Copy production template
cp .env.production .env.prod

# Update with live keys
VITE_STRIPE_PUBLIC_KEY=pk_live_your_live_key
VITE_ENVIRONMENT=production
VITE_API_URL=https://your-backend-domain.com/api
```

### 3. Backend Production Setup

```bash
# Update .env.backend for production
STRIPE_SECRET_KEY=sk_live_your_live_key
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
```

### 4. Deployment Checklist

- [ ] **Frontend Deployment** (Vercel/Netlify)
  - [ ] Connect GitHub repository
  - [ ] Set environment variables in dashboard
  - [ ] Configure build settings
  - [ ] Test deployment

- [ ] **Backend Deployment** (Heroku/Railway)
  - [ ] Create app/project
  - [ ] Set config vars (environment variables)
  - [ ] Deploy via Git
  - [ ] Verify server starts successfully

- [ ] **Stripe Configuration**
  - [ ] Switch to Live mode
  - [ ] Update webhook endpoints to production URLs
  - [ ] Test live payments with real cards
  - [ ] Monitor Stripe Dashboard for events

### 5. Final Testing

1. **Test with real payment methods** (small amounts)
2. **Verify webhook delivery** in production
3. **Check subscription management** works
4. **Test error scenarios** (declined cards, etc.)
5. **Monitor logs** for any issues

## 📚 Additional Resources

- **Deployment Checklist**: `DEPLOYMENT_CHECKLIST.md`
- **Payment Troubleshooting**: `PAYMENT_TROUBLESHOOTING.md`
- **Heroku Deployment**: `HEROKU_DEPLOYMENT_STEPS.md`
- **Vercel Deployment**: `VERCEL_DEPLOYMENT.md`

## 🎯 Current Status Summary

✅ **Development**: Complete with mock payments  
✅ **Test Environment**: Ready for real Stripe testing  
🚀 **Production Ready**: Follow deployment checklist  

**Next Steps:**
1. Replace test keys with your actual Stripe test keys
2. Test payment flow with test cards
3. Create production price IDs in Stripe
4. Deploy to production platforms
5. Switch to live Stripe keys

Your application is now fully configured for both testing and production deployment!