# 🚀 Heroku Deployment Script for RemoteMind

## 📋 Pre-Deployment Checklist

### ✅ **Step 1: Verify Your Setup**
```bash
# Check if you have the Heroku CLI (optional but helpful)
heroku --version

# If not installed, you can use the web dashboard instead
# Download from: https://devcenter.heroku.com/articles/heroku-cli
```

### ✅ **Step 2: Prepare Your Repository**
```bash
# Ensure all changes are committed
git status
git add .
git commit -m "Prepare for Heroku deployment"
git push origin main
```

## 🏗️ **Heroku App Creation**

### **Option A: Using Heroku CLI (Faster)**
```bash
# Login to Heroku
heroku login

# Create new app (replace 'your-app-name' with unique name)
heroku create remotemind-backend-$(whoami)

# Add buildpack for Node.js
heroku buildpacks:set heroku/nodejs

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set PORT=3001
heroku config:set CLIENT_URL=http://localhost:3000

# Deploy
git push heroku main
```

### **Option B: Using Web Dashboard (Recommended for beginners)**
1. Go to [dashboard.heroku.com](https://dashboard.heroku.com)
2. Click "New" → "Create new app"
3. App name: `remotemind-backend-[yourname]`
4. Region: Choose closest to your users
5. Click "Create app"

## ⚙️ **Environment Variables Setup**

### **Required Config Vars for Heroku:**
```bash
# Copy these to Heroku Config Vars section:
NODE_ENV=production
PORT=3001
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_live_your_actual_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### **How to Add Config Vars:**
1. Go to your Heroku app dashboard
2. Click "Settings" tab
3. Click "Reveal Config Vars"
4. Add each variable above

## 🔗 **GitHub Integration Setup**

### **Connect Repository:**
1. In Heroku app dashboard, go to "Deploy" tab
2. Under "Deployment method", select "GitHub"
3. Click "Connect to GitHub"
4. Search for your repository name
5. Click "Connect"
6. Enable "Automatic deploys" from main branch (optional)

## 🚀 **Deploy Your Backend**

### **Manual Deployment:**
1. Go to "Deploy" tab
2. Scroll to "Manual deploy" section
3. Select "main" branch
4. Click "Deploy Branch"
5. Wait for build to complete (2-5 minutes)

### **Verify Deployment:**
```bash
# Your app will be available at:
https://your-app-name.herokuapp.com

# Test health endpoint:
curl https://your-app-name.herokuapp.com/api/health
```

## 🎯 **Stripe Configuration**

### **Step 1: Create Webhook in Stripe Dashboard**
1. Go to [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Endpoint URL: `https://your-app-name.herokuapp.com/webhook/stripe`
4. Select events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click "Add endpoint"

### **Step 2: Get Webhook Secret**
1. Click on your newly created webhook
2. In "Signing secret" section, click "Reveal"
3. Copy the secret (starts with `whsec_`)
4. Update Heroku Config Vars with this value

### **Step 3: Update Stripe Keys**
```bash
# For testing, use test keys first:
STRIPE_SECRET_KEY=sk_test_...

# For production, use live keys:
STRIPE_SECRET_KEY=sk_live_...
```

## 🔧 **Database Setup (Optional)**

### **Option 1: MongoDB Atlas (Recommended)**
```bash
# 1. Go to mongodb.com/atlas
# 2. Create free cluster
# 3. Get connection string
# 4. Add to Heroku Config Vars:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/remotemind
```

### **Option 2: Heroku Postgres**
```bash
# Add Postgres addon to your Heroku app
heroku addons:create heroku-postgresql:mini

# This automatically sets DATABASE_URL
```

## 🧪 **Testing Your Deployment**

### **Backend API Tests:**
```bash
# Health check
curl https://your-app-name.herokuapp.com/api/health

# Create checkout session (test)
curl -X POST https://your-app-name.herokuapp.com/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"priceId":"price_test_123"}'
```

### **Frontend Integration:**
1. Update your local `.env.local`:
```env
VITE_API_URL=https://your-app-name.herokuapp.com/api
```
2. Restart your frontend development server
3. Test subscription flow

## 📊 **Monitoring & Logs**

### **View Logs:**
```bash
# Using CLI:
heroku logs --tail --app your-app-name

# Using Dashboard:
# Go to app → More → View logs
```

### **Monitor Performance:**
1. Heroku Dashboard → Metrics tab
2. Monitor response times and errors
3. Set up alerts for issues

## 🚨 **Troubleshooting**

### **Common Issues:**

**Build Fails:**
- Check `package.json` has correct start script
- Verify Node.js version compatibility
- Check build logs for specific errors

**App Crashes:**
- Check Heroku logs: `heroku logs --tail`
- Verify environment variables are set
- Ensure PORT is set correctly

**CORS Errors:**
- Update `CLIENT_URL` in Config Vars
- Check CORS configuration in backend code

**Stripe Webhook Fails:**
- Verify webhook URL is correct
- Check webhook secret is properly set
- Test webhook endpoint manually

## ✅ **Deployment Success Checklist**

- [ ] Heroku app created and deployed
- [ ] All environment variables configured
- [ ] Backend API responding to health checks
- [ ] Stripe webhooks configured and working
- [ ] Frontend can communicate with backend
- [ ] Payment flow tested (test mode)
- [ ] Logs show no errors
- [ ] Ready for frontend deployment

## 🎯 **Next Steps**

1. **Frontend Deployment**: Deploy to Vercel/Netlify
2. **Domain Setup**: Configure custom domain
3. **SSL Certificate**: Ensure HTTPS is working
4. **Production Testing**: Test all features thoroughly
5. **Go Live**: Switch to Stripe live mode

---

**🎉 Your backend is now live on Heroku!**

**Backend URL**: `https://your-app-name.herokuapp.com`
**API Base**: `https://your-app-name.herokuapp.com/api`
**Webhook**: `https://your-app-name.herokuapp.com/webhook/stripe`

**Ready for Phase 3: Frontend Deployment!**