# Heroku Deployment - Step-by-Step Instructions

## 🚀 Ready to Deploy!

You've chosen **Heroku** - excellent choice for beginners! Follow these exact steps:

## Step 1: Heroku Account & App Creation

### 1.1 Create Heroku Account
1. Go to [https://dashboard.heroku.com](https://dashboard.heroku.com)
2. Click **"Sign up"** if you don't have an account
3. Verify your email address
4. Complete account setup

### 1.2 Create New App
1. Click **"New"** → **"Create new app"**
2. **App name:** `wellness-backend-[your-name]` (must be unique)
3. **Region:** Choose closest to your users (US/Europe)
4. Click **"Create app"**

## Step 2: Connect GitHub Repository

### 2.1 Prepare Repository
**First, ensure your code is on GitHub:**
```bash
# If not already done:
git add .
git commit -m "Ready for Heroku deployment"
git push origin main
```

### 2.2 Connect to Heroku
1. In your Heroku app dashboard, go to **"Deploy"** tab
2. Under **"Deployment method"**, select **"GitHub"**
3. Click **"Connect to GitHub"**
4. Authorize Heroku to access your GitHub
5. Search for your repository name
6. Click **"Connect"** next to your repo

## Step 3: Set Environment Variables

### 3.1 Configure Variables
1. Go to **"Settings"** tab in your Heroku app
2. Click **"Reveal Config Vars"**
3. Add these **exact** variables:

| Key | Value |
|-----|-------|
| `STRIPE_SECRET_KEY` | `sk_live_your_stripe_secret_key_here` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (get from Stripe Dashboard - see Step 4) |
| `CLIENT_URL` | `http://localhost:3000` (update later with frontend URL) |
| `NODE_ENV` | `production` |

**⚠️ Important:** Leave `STRIPE_WEBHOOK_SECRET` empty for now - we'll get it in Step 4

## Step 4: Deploy Your Backend

### 4.1 Manual Deploy
1. Go back to **"Deploy"** tab
2. Scroll to **"Manual deploy"** section
3. Select **"main"** branch (or your default branch)
4. Click **"Deploy Branch"**
5. **Wait for build to complete** (2-5 minutes)

### 4.2 Verify Deployment
1. Click **"View"** button when build completes
2. Your app should open in new tab
3. Add `/health` to the URL: `https://your-app.herokuapp.com/health`
4. You should see: `{"status":"OK","timestamp":"..."}`

**✅ Success!** Your backend is now live at: `https://your-app.herokuapp.com`

## Step 5: Update Frontend Configuration

### 5.1 Update .env File
Update your local `.env` file:
```env
VITE_STRIPE_PUBLIC_KEY=pk_live_51JLamOLC2SGImPo4xVKZc1pgfuRcEoI3QO4hLRBmnzns81PVngwKkRE5JuiLZShFJm2zmw8GVT7Bk0A6pfE10sGQ00byWRXqoD
VITE_ENVIRONMENT=production
VITE_API_URL=https://your-app.herokuapp.com
VITE_STRIPE_WEBHOOK_ENDPOINT=https://your-app.herokuapp.com/webhook
```

**Replace `your-app` with your actual Heroku app name!**

### 5.2 Test Frontend Connection
1. Your frontend should automatically restart
2. Test creating a subscription
3. Check browser console for any errors

## Step 6: Configure Stripe Webhooks

### 6.1 Create Webhook Endpoint
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. **Endpoint URL:** `https://your-app.herokuapp.com/webhook`
4. **Events to send:**
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click **"Add endpoint"**

### 6.2 Get Webhook Secret
1. Click on your newly created webhook
2. In **"Signing secret"** section, click **"Reveal"**
3. Copy the secret (starts with `whsec_`)

### 6.3 Update Heroku Config
1. Go back to Heroku app **"Settings"** → **"Config Vars"**
2. Update `STRIPE_WEBHOOK_SECRET` with the copied value
3. The app will automatically restart

## Step 7: Test Complete Payment Flow

### 7.1 Test Subscription
1. Go to your frontend: `http://localhost:3000`
2. Try to subscribe to a plan
3. Use Stripe test card: `4242 4242 4242 4242`
4. Complete the checkout process

### 7.2 Verify Webhook Events
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click on your webhook endpoint
3. Check **"Recent deliveries"** for successful events
4. Should see `checkout.session.completed` with 200 response

## Step 8: Deploy Frontend

### 8.1 Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. **"New site from Git"**
3. Connect GitHub repository
4. **Build command:** `npm run build`
5. **Publish directory:** `dist`
6. **Deploy site**

### 8.2 Update Backend CORS
After frontend deployment, update Heroku config:
1. **Settings** → **Config Vars**
2. Update `CLIENT_URL` to your Netlify URL: `https://your-site.netlify.app`

## Step 9: Switch to Stripe Live Mode

### 9.1 Get Live Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Toggle **"View test data"** to OFF (top right)
3. Go to **"Developers"** → **"API keys"**
4. Copy **"Publishable key"** and **"Secret key"**

### 9.2 Update Configuration
**Frontend (.env):**
```env
VITE_STRIPE_PUBLIC_KEY=pk_live_... (your live publishable key)
```

**Backend (Heroku Config Vars):**
- Update `STRIPE_SECRET_KEY` with live secret key
- Create new webhook endpoint for live mode
- Update `STRIPE_WEBHOOK_SECRET` with live webhook secret

## 🎉 Deployment Complete!

### Your Live URLs:
- **Backend:** `https://your-app.herokuapp.com`
- **Frontend:** `https://your-site.netlify.app`
- **Health Check:** `https://your-app.herokuapp.com/health`

### Monitoring & Maintenance:
1. **Heroku Logs:** `heroku logs --tail` (if CLI available)
2. **Stripe Dashboard:** Monitor payments and webhooks
3. **Netlify Dashboard:** Monitor frontend deployments

### Troubleshooting:
- **500 errors:** Check Heroku logs in dashboard
- **CORS errors:** Verify `CLIENT_URL` is correct
- **Webhook failures:** Check Stripe webhook logs
- **Payment issues:** Verify all Stripe keys are live mode

---

**🚀 You're now live in production!** 

Test everything thoroughly before announcing to users. Start with small test transactions to ensure everything works perfectly.