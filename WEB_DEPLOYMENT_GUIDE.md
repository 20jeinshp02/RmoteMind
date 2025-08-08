# Web-Based Deployment Guide (No CLI Required)

## Overview
Since CLI installations require administrator privileges, this guide focuses on web-based deployment methods that work entirely through browser interfaces.

## Prerequisites
- ✅ Backend code ready (`backend-example.js`, `Procfile` created)
- ✅ Package.json updated with start script
- ✅ Environment variables prepared
- ✅ Git repository (GitHub recommended)

## Option 1: Heroku Web Dashboard (Recommended)

### Step 1: Prepare Your Repository
1. **Ensure all files are committed to Git**
2. **Push to GitHub** (create repository if needed)
3. **Verify these files exist:**
   - ✅ `Procfile` (created)
   - ✅ `package.json` with start script (updated)
   - ✅ `backend-example.js`
   - ✅ `.env.backend` (for reference, not deployed)

### Step 2: Deploy to Heroku
1. **Go to [Heroku Dashboard](https://dashboard.heroku.com)**
2. **Create account** if you don't have one
3. **Click "New" → "Create new app"**
4. **Choose app name** (e.g., `your-wellness-backend`)
5. **Select region** (US or Europe)
6. **Click "Create app"**

### Step 3: Connect GitHub
1. **Go to "Deploy" tab**
2. **Select "GitHub" as deployment method**
3. **Connect your GitHub account**
4. **Search and select your repository**
5. **Click "Connect"**

### Step 4: Set Environment Variables
1. **Go to "Settings" tab**
2. **Click "Reveal Config Vars"**
3. **Add these variables:**
   ```
   STRIPE_SECRET_KEY = sk_live_... (your Stripe secret key)
   STRIPE_WEBHOOK_SECRET = whsec_... (get from Stripe Dashboard)
   CLIENT_URL = https://your-frontend-domain.com
   NODE_ENV = production
   ```

### Step 5: Deploy
1. **Go back to "Deploy" tab**
2. **Enable "Automatic deploys"** (optional)
3. **Click "Deploy Branch"** (main/master)
4. **Wait for build to complete**
5. **Click "View" to test your app**

## Option 2: Railway Web Dashboard

### Step 1: Setup
1. **Go to [Railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**

### Step 2: Configure
1. **Railway will auto-detect Node.js**
2. **Set environment variables in Variables tab:**
   ```
   STRIPE_SECRET_KEY = sk_live_...
   STRIPE_WEBHOOK_SECRET = whsec_...
   CLIENT_URL = https://your-frontend-domain.com
   NODE_ENV = production
   ```
3. **Deploy automatically starts**

## Option 3: Render.com

### Step 1: Setup
1. **Go to [Render.com](https://render.com)**
2. **Sign up with GitHub**
3. **Click "New" → "Web Service"**
4. **Connect your repository**

### Step 2: Configure
1. **Set these settings:**
   - **Name:** your-wellness-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
2. **Add environment variables**
3. **Click "Create Web Service"**

## Option 4: Vercel Web Dashboard

### Step 1: Create Account
1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Import your project**

### Step 2: Configure
1. **Framework Preset:** Other
2. **Build Command:** (leave empty)
3. **Output Directory:** (leave empty)
4. **Install Command:** `npm install`
5. **Add environment variables**
6. **Deploy**

## Testing Your Deployment

### 1. Health Check
After deployment, test your backend:
```bash
curl https://your-app-url.com/health
```

### 2. Update Frontend
Update your `.env` file:
```env
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_ENVIRONMENT=production
VITE_API_URL=https://your-backend-url.com
VITE_STRIPE_WEBHOOK_ENDPOINT=https://your-backend-url.com/webhook
```

### 3. Configure Stripe Webhooks
1. **Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)**
2. **Create new webhook endpoint**
3. **URL:** `https://your-backend-url.com/webhook`
4. **Events to send:**
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. **Copy webhook secret to your environment variables**

## Platform Comparison

| Platform | Free Tier | Ease of Use | Performance | Custom Domain |
|----------|-----------|-------------|-------------|---------------|
| **Heroku** | ✅ 550 hours/month | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ✅ |
| **Railway** | ✅ $5 credit | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ |
| **Render** | ✅ 750 hours/month | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ |
| **Vercel** | ✅ Generous | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ |

## Recommended Deployment Flow

1. **Start with Heroku** (most beginner-friendly)
2. **If Heroku doesn't work, try Railway**
3. **For better performance, use Render or Vercel**

## Common Issues & Solutions

### Build Failures
- **Check Node.js version** in package.json
- **Verify all dependencies** are in package.json
- **Check build logs** for specific errors

### Environment Variables Not Working
- **Double-check variable names** (case-sensitive)
- **Ensure no extra spaces** in values
- **Redeploy after adding variables**

### Webhook Issues
- **Verify webhook URL** is correct
- **Check webhook secret** matches environment variable
- **Test with Stripe CLI** or webhook testing tools

## Next Steps

1. **Choose a platform** and deploy your backend
2. **Test the health endpoint**
3. **Update frontend configuration**
4. **Configure Stripe webhooks**
5. **Test complete payment flow**
6. **Deploy frontend** to Netlify/Vercel
7. **Switch to Stripe live mode**

## Support Resources

- **Heroku:** [devcenter.heroku.com](https://devcenter.heroku.com)
- **Railway:** [docs.railway.app](https://docs.railway.app)
- **Render:** [render.com/docs](https://render.com/docs)
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Stripe:** [stripe.com/docs](https://stripe.com/docs)

All these platforms offer excellent documentation and community support for troubleshooting deployment issues.