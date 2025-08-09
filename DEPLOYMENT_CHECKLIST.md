# Deployment Checklist

## Pre-Deployment Security Checklist ✅

### Environment Variables
- [ ] Remove all hardcoded API keys from source code
- [ ] Verify `.env` files are in `.gitignore`
- [ ] Set up production environment variables
- [ ] Test with Stripe test keys first

### Stripe Configuration
- [ ] Create Stripe account and get API keys
- [ ] Configure webhook endpoints in Stripe Dashboard
- [ ] Set webhook URL to: `https://your-domain.com/webhook`
- [ ] Enable required webhook events:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`

### Frontend Deployment
- [ ] Update `VITE_API_URL` in production `.env`
- [ ] Update `VITE_WEBHOOK_URL` in production `.env`
- [ ] Build and test frontend locally
- [ ] Deploy to hosting platform (Vercel/Netlify)

### Backend Deployment
- [ ] Copy `.env.production` to `.env.backend`
- [ ] Update all placeholder values with actual keys
- [ ] Deploy to hosting platform (Heroku/Railway/Render)
- [ ] Verify webhook endpoint is accessible

### Testing
- [ ] Test Stripe checkout flow
- [ ] Test webhook delivery
- [ ] Test subscription management
- [ ] Verify error handling

### Production Readiness
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up monitoring and logging
- [ ] Test with real payment methods

## Quick Start Commands

```bash
# Install dependencies
npm install

# Set up environment (copy and edit)
cp .env.production .env.backend

# Start development servers
npm run dev          # Frontend (port 3000)
node backend-example.js  # Backend (port 3001)
```

## Deployment Platforms

- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, Render, DigitalOcean
- **Full-stack**: Vercel (with API routes), Netlify Functions

See individual deployment guides for platform-specific instructions.