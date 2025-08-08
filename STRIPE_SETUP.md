# Stripe Payment Integration Setup

This guide explains how to set up the complete Stripe payment system for your wellness application.

## 🔑 Current Status

✅ **Frontend Setup Complete**
- Stripe public key configured in `.env`
- Environment variables properly implemented
- Subscription modal and checkout flow ready
- Mock payment system working for development

⚠️ **Backend Setup Required for Production**
- Private key provided but needs backend implementation
- Webhook endpoints need to be created
- Database integration for subscription management

## 🚀 Quick Start for Production

### 1. Frontend Configuration (Already Done)

Your `.env` file is already configured:
```env
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_ENVIRONMENT=development
VITE_API_URL=http://localhost:3001/api
```

### 2. Backend Setup (Next Steps)

#### Install Backend Dependencies
```bash
# Copy the example files
cp backend-package.json package.json
npm install
```

#### Create Backend Environment File
Create a `.env` file for your backend server:
```env
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
CLIENT_URL=http://localhost:3000
PORT=3001
```

#### Start Backend Server
```bash
node backend-example.js
# or for development
npm run dev
```

### 3. Stripe Dashboard Configuration

1. **Get Real Price IDs**
   - Go to Stripe Dashboard → Products
   - Create your subscription plans
   - Copy the price IDs and update `stripePriceIds` in `stripeService.ts`

2. **Set Up Webhooks**
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://yourdomain.com/webhook/stripe`
   - Select events: `checkout.session.completed`, `invoice.payment_succeeded`, `invoice.payment_failed`
   - Copy webhook secret to your backend `.env`

### 4. Switch to Production Mode

Update your frontend `.env`:
```env
VITE_ENVIRONMENT=production
VITE_API_URL=https://yourdomain.com/api
```

## 🔒 Security Best Practices

### ✅ What's Secure
- Private key stored in backend environment variables
- Public key properly configured in frontend
- Webhook signature verification implemented
- CORS properly configured

### ⚠️ Important Notes
- **NEVER** commit `.env` files to version control
- **NEVER** expose the private key in frontend code
- Always use HTTPS in production
- Validate webhook signatures

## 🧪 Testing

### Development Mode (Current)
- Uses mock payment flow
- No real charges processed
- Simulates successful payments

### Test Mode
- Use Stripe test keys: `pk_test_...` and `sk_test_...`
- Use test card numbers from Stripe documentation
- Test webhook events

### Production Mode
- Real payments processed
- Live Stripe keys required
- Webhook endpoints must be publicly accessible

## 📋 Subscription Plans

Current plans configured:
- **Free**: 2 AI Therapist sessions/month
- **Basic**: 5 AI Therapist sessions/month
- **Premium**: 15 AI Therapist sessions/month
- **Enterprise**: Unlimited AI Therapist sessions

## 🔧 Troubleshooting

### Common Issues

1. **"Stripe failed to initialize"**
   - Check if public key is correctly set in `.env`
   - Verify environment variables are loaded

2. **"Failed to create checkout session"**
   - Ensure backend server is running
   - Check API URL configuration
   - Verify private key is correct

3. **Webhook events not received**
   - Check webhook URL is publicly accessible
   - Verify webhook secret is correct
   - Check Stripe Dashboard for delivery attempts

### Debug Mode

To enable debug logging, add to your backend:
```javascript
stripe.setApiVersion('2023-10-16');
stripe.setAppInfo({
  name: 'Wellness App',
  version: '1.0.0',
});
```

## 📞 Support

If you encounter issues:
1. Check Stripe Dashboard logs
2. Review browser console for frontend errors
3. Check backend server logs
4. Verify all environment variables are set correctly

---

**Ready to go live?** Update your environment to `production` and start processing real payments! 🎉