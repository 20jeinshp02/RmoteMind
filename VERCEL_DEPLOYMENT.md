# Vercel Deployment Guide

## Overview
Vercel is an excellent alternative to Heroku for deploying your wellness application backend. It offers:
- ✅ Serverless functions (automatic scaling)
- ✅ Easy GitHub integration
- ✅ Free tier available
- ✅ Built-in SSL certificates
- ✅ Global CDN

## Prerequisites
- Vercel CLI is already installed and working
- Backend code is ready (`backend-example.js` and `vercel.json` created)
- Environment variables prepared

## Deployment Steps

### 1. Login to Vercel
```bash
npx vercel login
```

### 2. Deploy to Vercel
```bash
# Deploy to preview (staging)
npx vercel

# Deploy to production
npx vercel --prod
```

### 3. Set Environment Variables
After deployment, set your environment variables:

```bash
# Set Stripe secret key
npx vercel env add STRIPE_SECRET_KEY
# Enter your Stripe secret key when prompted

# Set webhook secret (get this from Stripe Dashboard)
npx vercel env add STRIPE_WEBHOOK_SECRET
# Enter your webhook secret when prompted

# Set client URL (your frontend domain)
npx vercel env add CLIENT_URL
# Enter your frontend URL (e.g., https://your-app.netlify.app)

# Set Node environment
npx vercel env add NODE_ENV production
```

### 4. Redeploy with Environment Variables
```bash
npx vercel --prod
```

## Configuration Files

### vercel.json (Already Created)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend-example.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend-example.js"
    },
    {
      "src": "/(.*)",
      "dest": "/backend-example.js"
    }
  ]
}
```

### Backend Modifications (Already Done)
- Updated `backend-example.js` to export the Express app for serverless compatibility
- Maintained local development server functionality

## Frontend Configuration Update

After deploying your backend, update your frontend `.env` file:

```env
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_ENVIRONMENT=production
VITE_API_URL=https://your-backend.vercel.app
VITE_STRIPE_WEBHOOK_ENDPOINT=https://your-backend.vercel.app/webhook
```

## Stripe Webhook Configuration

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Create a new webhook endpoint
3. Set the URL to: `https://your-backend.vercel.app/webhook`
4. Select these events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook secret and add it to Vercel environment variables

## Testing Your Deployment

### 1. Health Check
```bash
curl https://your-backend.vercel.app/health
```

### 2. Test Stripe Integration
- Use your frontend to create a test checkout session
- Verify webhook events are received
- Check Vercel function logs for any errors

## Monitoring and Logs

### View Logs
```bash
# View recent logs
npx vercel logs

# View logs for specific deployment
npx vercel logs [deployment-url]
```

### Vercel Dashboard
- Visit [vercel.com/dashboard](https://vercel.com/dashboard)
- Monitor function invocations
- Check error rates
- View performance metrics

## Advantages of Vercel vs Heroku

| Feature | Vercel | Heroku |
|---------|--------|--------|
| Free Tier | ✅ Generous | ✅ Limited |
| Cold Starts | ⚡ Fast | 🐌 Slow (free tier) |
| Scaling | 🚀 Automatic | 💰 Manual/Paid |
| SSL | ✅ Automatic | ✅ Automatic |
| GitHub Integration | ✅ Excellent | ✅ Good |
| CLI Setup | ✅ No sudo required | ❌ Requires admin |

## Troubleshooting

### Common Issues

1. **Environment Variables Not Working**
   ```bash
   # List all environment variables
   npx vercel env ls
   
   # Remove and re-add if needed
   npx vercel env rm VARIABLE_NAME
   npx vercel env add VARIABLE_NAME
   ```

2. **Function Timeout**
   - Vercel functions have a 10-second timeout on free tier
   - Optimize your Stripe API calls
   - Consider upgrading to Pro plan if needed

3. **CORS Issues**
   - Ensure your frontend URL is correctly set in CLIENT_URL
   - Check CORS configuration in backend-example.js

4. **Webhook Verification Fails**
   - Verify webhook secret is correctly set
   - Check Stripe webhook logs for delivery status

### Getting Help

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- Stripe Documentation: [stripe.com/docs](https://stripe.com/docs)

## Next Steps

1. Deploy your backend to Vercel
2. Update frontend environment variables
3. Configure Stripe webhooks
4. Test the complete payment flow
5. Deploy your frontend to Netlify/Vercel
6. Switch to Stripe live mode when ready