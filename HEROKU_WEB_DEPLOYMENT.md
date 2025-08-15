# 🚀 Heroku Web Dashboard Deployment Guide

## 📋 **Prerequisites Completed ✅**
- [x] Repository pushed to GitHub: `https://github.com/20jeinshp02/RmoteMind.git`
- [x] All deployment files created and committed
- [x] Procfile configured: `web: node backend-example.js`
- [x] Backend code ready: `backend-example.js`

---

## 🎯 **Step 1: Create Heroku Account & App**

### **1.1 Sign Up/Login to Heroku**
1. Go to [heroku.com](https://heroku.com)
2. Click **"Sign up"** (if new) or **"Log in"**
3. Complete account verification if needed

### **1.2 Create New App**
1. Go to [dashboard.heroku.com](https://dashboard.heroku.com)
2. Click **"New"** → **"Create new app"**
3. **App name**: `remotemind-backend-jenish` (or similar unique name)
4. **Region**: Choose **"United States"** or **"Europe"** (closest to your users)
5. Click **"Create app"**

**✅ Your app URL will be**: `https://remotemind-backend-jenish.herokuapp.com`

---

## 🔗 **Step 2: Connect GitHub Repository**

### **2.1 Connect to GitHub**
1. In your new Heroku app dashboard, go to **"Deploy"** tab
2. Under **"Deployment method"**, click **"GitHub"**
3. Click **"Connect to GitHub"**
4. Authorize Heroku to access your GitHub account

### **2.2 Connect Repository**
1. In **"Connect to GitHub"** section:
   - **Repository name**: Type `RmoteMind`
   - Click **"Search"**
   - Find `20jeinshp02/RmoteMind`
   - Click **"Connect"**

### **2.3 Enable Automatic Deploys (Optional)**
1. In **"Automatic deploys"** section:
   - Select branch: **"main"**
   - Check **"Wait for CI to pass before deploy"** (if you have CI)
   - Click **"Enable Automatic Deploys"**

---

## ⚙️ **Step 3: Configure Environment Variables**

### **3.1 Go to Settings**
1. Click **"Settings"** tab in your Heroku app
2. Scroll to **"Config Vars"** section
3. Click **"Reveal Config Vars"**

### **3.2 Add Required Variables**
Add these **Config Vars** one by one:

| **KEY** | **VALUE** |
|---------|----------|
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `CLIENT_URL` | `http://localhost:3000` |
| `STRIPE_SECRET_KEY` | `sk_test_your_test_key_here` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_will_add_after_webhook_setup` |

**⚠️ Important Notes:**
- Start with **test** Stripe keys (`sk_test_...`)
- We'll update `CLIENT_URL` after frontend deployment
- We'll get `STRIPE_WEBHOOK_SECRET` in Step 5

---

## 🚀 **Step 4: Deploy Your Backend**

### **4.1 Manual Deploy**
1. Go to **"Deploy"** tab
2. Scroll to **"Manual deploy"** section
3. Select branch: **"main"**
4. Click **"Deploy Branch"**

### **4.2 Monitor Deployment**
1. Watch the build logs in real-time
2. Look for:
   ```
   -----> Node.js app detected
   -----> Installing dependencies
   -----> Build succeeded!
   -----> Launching...
   ```
3. **Success message**: `"Your app was successfully deployed"`

### **4.3 Verify Deployment**
1. Click **"View"** button (or visit your app URL)
2. You should see your backend running
3. Test health endpoint: `https://your-app-name.herokuapp.com/api/health`

---

## 🧪 **Step 5: Test Your Backend**

### **5.1 Run Automated Tests**
```bash
# In your local terminal:
node test-backend.js https://remotemind-backend-jenish.herokuapp.com
```

### **5.2 Manual Testing**
**Health Check:**
```bash
curl https://remotemind-backend-jenish.herokuapp.com/api/health
```

**Expected Response:**
```json
{"status":"OK","message":"RemoteMind Backend is running"}
```

---

## 🎯 **Step 6: Configure Stripe Webhooks**

### **6.1 Create Webhook Endpoint**
1. Go to [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. **Endpoint URL**: `https://remotemind-backend-jenish.herokuapp.com/webhook/stripe`
4. **Events to send**:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click **"Add endpoint"**

### **6.2 Get Webhook Secret**
1. Click on your newly created webhook
2. In **"Signing secret"** section, click **"Reveal"**
3. Copy the secret (starts with `whsec_`)

### **6.3 Update Heroku Config**
1. Go back to Heroku app **"Settings"** → **"Config Vars"**
2. Update `STRIPE_WEBHOOK_SECRET` with the copied value
3. The app will automatically restart

---

## ✅ **Step 7: Final Verification**

### **7.1 Check All Endpoints**
```bash
# Health check
curl https://remotemind-backend-jenish.herokuapp.com/api/health

# Test checkout (should return error without proper data - that's expected)
curl -X POST https://remotemind-backend-jenish.herokuapp.com/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{}'
```

### **7.2 Monitor Logs**
1. In Heroku dashboard, go to **"More"** → **"View logs"**
2. Check for any errors
3. Should see successful startup messages

---

## 🎉 **Deployment Complete!**

### **✅ What You Now Have:**
- **Live Backend**: `https://remotemind-backend-jenish.herokuapp.com`
- **API Endpoints**: `https://remotemind-backend-jenish.herokuapp.com/api/*`
- **Webhook Endpoint**: `https://remotemind-backend-jenish.herokuapp.com/webhook/stripe`
- **Stripe Integration**: Configured and ready
- **Environment**: Production-ready

### **📋 Next Steps:**
1. **Update Frontend**: Configure `.env.local` with your backend URL
2. **Test Integration**: Ensure frontend can communicate with backend
3. **Deploy Frontend**: Use Vercel or Netlify
4. **Update CORS**: Set correct `CLIENT_URL` after frontend deployment
5. **Go Live**: Switch to Stripe live keys

---

## 🔧 **Troubleshooting**

### **Common Issues:**

**Build Fails:**
- Check that `package.json` and `backend-package.json` are correct
- Verify all dependencies are listed
- Check build logs for specific errors

**App Crashes:**
- Check logs: **"More"** → **"View logs"**
- Verify environment variables are set correctly
- Ensure `PORT` is set to `3001`

**API Not Responding:**
- Check if app is sleeping (free tier sleeps after 30 min)
- Visit the app URL to wake it up
- Verify endpoints in browser

**Stripe Errors:**
- Verify webhook URL is exactly: `https://your-app.herokuapp.com/webhook/stripe`
- Check webhook secret is correctly set
- Test webhook in Stripe dashboard

---

## 📞 **Support Resources**

- **Heroku Logs**: Dashboard → More → View logs
- **Heroku Status**: [status.heroku.com](https://status.heroku.com)
- **Stripe Webhooks**: [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
- **Test Script**: `node test-backend.js <your-app-url>`

---

**🚀 Your RemoteMind backend is now live on Heroku!**

**Ready for Phase 3: Frontend Deployment** 🎯