# 🆓 Render.com Free Backend Deployment Guide

## 🎯 **Why Render.com for Free Hosting?**

- ✅ **Completely Free**: 750 hours/month (enough for production)
- ✅ **Custom Domain**: Full support for your purchased domain
- ✅ **Automatic SSL**: Free HTTPS certificates
- ✅ **GitHub Integration**: Auto-deploy on code changes
- ✅ **Free Database**: PostgreSQL included
- ⚠️ **Sleep Mode**: Apps sleep after 15 minutes of inactivity (wakes in ~30 seconds)

---

## 🚀 **Step-by-Step Deployment**

### **Step 1: Prepare Your Repository**

```bash
# Ensure all changes are committed and pushed
git status
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### **Step 2: Create Render Account**

1. Go to [render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with GitHub (recommended for easy integration)
4. Authorize Render to access your repositories

### **Step 3: Create New Web Service**

1. **Dashboard**: Click **"New +"** → **"Web Service"**
2. **Connect Repository**: 
   - Select `20jeinshp02/RmoteMind`
   - Click **"Connect"**

### **Step 4: Configure Service Settings**

#### **Basic Settings:**
- **Name**: `remotemind-backend`
- **Region**: Choose closest to your users (US East, Europe, etc.)
- **Branch**: `main`
- **Root Directory**: Leave empty (uses project root)

#### **Build & Deploy Settings:**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node backend-example.js`

### **Step 5: Environment Variables**

In the **"Environment"** section, add these variables:

| **Variable** | **Value** |
|--------------|----------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `CLIENT_URL` | `https://your-domain.com` |
| `STRIPE_SECRET_KEY` | `sk_test_your_test_key_here` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_placeholder` |

**⚠️ Important Notes:**
- Render uses port `10000` by default
- Start with test Stripe keys
- Update `CLIENT_URL` with your actual domain

### **Step 6: Deploy**

1. **Review Settings**: Double-check all configurations
2. **Create Web Service**: Click **"Create Web Service"**
3. **Monitor Build**: Watch the deployment logs in real-time
4. **Wait for Success**: Build typically takes 2-5 minutes

### **Step 7: Get Your Backend URL**

After successful deployment:
- **Free URL**: `https://remotemind-backend.onrender.com`
- **Status**: Check the service dashboard for "Live" status

---

## 🔗 **Connect Your Custom Domain**

### **Step 1: Add Custom Domain in Render**

1. **Service Dashboard**: Go to your deployed service
2. **Settings Tab**: Scroll to **"Custom Domains"**
3. **Add Domain**: Enter `api.your-domain.com` (or subdomain of choice)
4. **Verify**: Render will provide DNS instructions

### **Step 2: Update DNS Settings**

In your domain registrar (where you bought the domain):

1. **Add CNAME Record**:
   - **Name**: `api` (or your chosen subdomain)
   - **Value**: `remotemind-backend.onrender.com`
   - **TTL**: `300` (5 minutes)

2. **Wait for Propagation**: 5-30 minutes

### **Step 3: Verify SSL Certificate**

- Render automatically provisions SSL certificates
- Your API will be available at: `https://api.your-domain.com`

---

## 🧪 **Test Your Deployment**

### **Method 1: Using Test Script**

```bash
# Test with Render URL
node test-backend.js https://remotemind-backend.onrender.com

# Test with custom domain (after DNS setup)
node test-backend.js https://api.your-domain.com
```

### **Method 2: Manual Testing**

```bash
# Health check
curl https://remotemind-backend.onrender.com/api/health

# Should return: {"status":"OK","timestamp":"..."}
```

---

## ⚙️ **Configure Stripe Webhooks**

### **Step 1: Create Webhook in Stripe Dashboard**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. **Endpoint URL**: `https://api.your-domain.com/api/webhook`
4. **Events**: Select `checkout.session.completed`
5. **Create Endpoint**

### **Step 2: Update Webhook Secret**

1. **Copy Webhook Secret**: From Stripe (starts with `whsec_`)
2. **Update Render Environment**:
   - Go to service **Settings** → **Environment**
   - Update `STRIPE_WEBHOOK_SECRET` with actual value
   - **Save Changes**

### **Step 3: Redeploy**

- Render will automatically redeploy with new environment variables
- Wait for deployment to complete

---

## 🔄 **Auto-Deploy Setup**

### **Enable Auto-Deploy**

1. **Service Settings**: Go to **"Build & Deploy"**
2. **Auto-Deploy**: Toggle **"Yes"**
3. **Branch**: Ensure `main` is selected

**Now every push to `main` branch will automatically deploy!**

---

## 📊 **Monitoring & Logs**

### **View Logs**

1. **Service Dashboard**: Click **"Logs"** tab
2. **Real-time**: Monitor live application logs
3. **Filter**: Use search to find specific errors

### **Service Metrics**

- **CPU Usage**: Monitor in dashboard
- **Memory Usage**: Track resource consumption
- **Response Times**: Check performance metrics

---

## ⚠️ **Important Considerations**

### **Sleep Mode**

- **Free tier apps sleep** after 15 minutes of inactivity
- **Wake-up time**: ~30 seconds on first request
- **Solution**: Consider a simple ping service or upgrade to paid plan

### **Resource Limits**

- **Memory**: 512 MB
- **CPU**: Shared
- **Bandwidth**: 100 GB/month
- **Build Time**: 20 minutes max

### **Database Options**

- **Free PostgreSQL**: 1 GB storage
- **External**: MongoDB Atlas (free tier)
- **Upgrade**: Paid plans for more resources

---

## 🎉 **Success Checklist**

- [ ] ✅ Backend deployed to Render
- [ ] ✅ Custom domain connected
- [ ] ✅ SSL certificate active
- [ ] ✅ Environment variables set
- [ ] ✅ Health check endpoint working
- [ ] ✅ Stripe webhooks configured
- [ ] ✅ Auto-deploy enabled
- [ ] ✅ All tests passing

---

## 🆘 **Troubleshooting**

### **Build Failures**

```bash
# Check package.json scripts
# Ensure backend-example.js exists
# Verify Node.js version compatibility
```

### **Environment Variable Issues**

- Double-check all variable names and values
- Ensure no extra spaces or quotes
- Redeploy after changes

### **Domain Connection Issues**

- Verify DNS propagation: [whatsmydns.net](https://whatsmydns.net)
- Check CNAME record points to correct Render URL
- Wait up to 24 hours for full propagation

### **Sleep Mode Solutions**

```bash
# Option 1: Simple ping service
# Set up a cron job to ping your API every 10 minutes

# Option 2: Upgrade to paid plan ($7/month)
# No sleep mode, better performance
```

---

## 🔄 **Next Steps**

1. **Frontend Deployment**: Deploy to Vercel/Netlify
2. **Update Frontend Config**: Point to your new backend URL
3. **Production Testing**: Test complete payment flow
4. **Go Live**: Switch to Stripe live mode

**Your backend is now live and completely free! 🎉**