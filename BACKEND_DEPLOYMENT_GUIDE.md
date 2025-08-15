# 🚀 Backend Deployment Guide for RemoteMind

## 📋 Overview

Your backend is a Node.js Express server with Stripe integration. Here are the best hosting options:

## 🏆 Recommended Hosting Platforms

### 1. **Railway** (Recommended - Modern & Easy)
- ✅ **Pros**: Modern, Git-based deployment, generous free tier, automatic HTTPS
- ✅ **Setup Time**: 10-15 minutes
- ✅ **Cost**: Free tier available, $5/month for production
- ✅ **Database**: Built-in PostgreSQL/MongoDB options

### 2. **Render** (Great Free Option)
- ✅ **Pros**: Excellent free tier, easy deployment, automatic SSL
- ✅ **Setup Time**: 15-20 minutes
- ✅ **Cost**: Free tier (with limitations), $7/month for production
- ✅ **Database**: Free PostgreSQL included

### 3. **Heroku** (Most Popular)
- ✅ **Pros**: Well-documented, reliable, many add-ons
- ❌ **Cons**: No free tier anymore, more expensive
- ✅ **Setup Time**: 20-30 minutes
- ✅ **Cost**: $7/month minimum

### 4. **Vercel** (Serverless)
- ✅ **Pros**: Same platform as frontend, serverless functions
- ❌ **Cons**: Requires code modifications for serverless
- ✅ **Setup Time**: 30-45 minutes (with modifications)
- ✅ **Cost**: Free tier available

## 🚀 Quick Start: Railway Deployment

### Step 1: Prepare Your Code
1. Create `package.json` for backend:
```bash
cp backend-package.json package-backend.json
```

2. Create `.env.backend` with your actual values:
```env
STRIPE_SECRET_KEY=sk_live_your_actual_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
CLIENT_URL=https://your-domain.com
PORT=3001
NODE_ENV=production
```

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Configure:
   - **Root Directory**: `/` (or create separate backend repo)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Port**: `3001`

### Step 3: Configure Environment Variables
In Railway dashboard, add these variables:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `CLIENT_URL`
- `NODE_ENV=production`
- `PORT=3001`

### Step 4: Get Your Backend URL
Railway will provide a URL like: `https://your-app-name.up.railway.app`

## 🗄️ Database Setup Options

### Option 1: MongoDB Atlas (Recommended)
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Get connection string
4. Add `MONGODB_URI` to environment variables

### Option 2: Railway PostgreSQL
1. In Railway, click "Add Service" → "Database" → "PostgreSQL"
2. Railway auto-generates `DATABASE_URL`
3. Use in your backend code

## 🔧 Backend Code Modifications Needed

### 1. Add Database Integration
Create `models/User.js`:
```javascript
// Add user model for subscription management
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  stripeCustomerId: String,
  subscriptionStatus: String,
  subscriptionId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
```

### 2. Update backend-example.js
Add database connection:
```javascript
// Add at top of file
const mongoose = require('mongoose');

// Connect to database
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
```

### 3. Enhanced Webhook Handling
Update webhook to save user data:
```javascript
case 'checkout.session.completed':
  const session = event.data.object;
  // Save user subscription to database
  const user = new User({
    email: session.customer_email,
    stripeCustomerId: session.customer,
    subscriptionStatus: 'active',
    subscriptionId: session.subscription
  });
  await user.save();
  break;
```

## 🔐 Stripe Webhook Configuration

### Step 1: Create Webhook in Stripe Dashboard
1. Go to Stripe Dashboard → Webhooks
2. Click "Add endpoint"
3. URL: `https://your-backend-url.com/webhook/stripe`
4. Events to send:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### Step 2: Get Webhook Secret
1. Copy the webhook signing secret
2. Add to environment variables as `STRIPE_WEBHOOK_SECRET`

## ✅ Testing Your Backend

### Test Endpoints:
```bash
# Test health check
curl https://your-backend-url.com/api/health

# Test checkout session creation
curl -X POST https://your-backend-url.com/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"priceId":"price_test_123"}'
```

## 🚨 Common Issues & Solutions

### Issue: CORS Errors
**Solution**: Update CORS configuration:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

### Issue: Webhook Verification Failed
**Solution**: Ensure webhook secret is correct and endpoint URL matches exactly

### Issue: Environment Variables Not Loading
**Solution**: Check file path in `require('dotenv').config({ path: '.env.backend' })`

## 📊 Deployment Checklist

- [ ] Backend code deployed
- [ ] Environment variables configured
- [ ] Database connected
- [ ] Stripe webhooks configured
- [ ] CORS properly set up
- [ ] SSL certificate active
- [ ] Health check endpoint working
- [ ] Payment flow tested

## 🔗 Next Steps

1. **Deploy Backend**: Choose platform and deploy
2. **Configure Database**: Set up MongoDB or PostgreSQL
3. **Update Frontend**: Point `VITE_API_URL` to your backend
4. **Test Integration**: Verify frontend can communicate with backend
5. **Configure Stripe**: Set up production webhooks

## 📞 Support Resources

- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Render Docs: [render.com/docs](https://render.com/docs)
- Stripe Webhooks: [stripe.com/docs/webhooks](https://stripe.com/docs/webhooks)

---

**Ready to deploy?** Choose your platform and let's get started! 🚀