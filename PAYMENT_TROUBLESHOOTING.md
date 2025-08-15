# Payment Troubleshooting Guide

## Common Payment Issues and Solutions

### "Payment failed. Please try again." Error

This error can occur for several reasons. Follow these steps to diagnose and fix:

#### 1. Check Environment Configuration

**For Development/Testing:**
```bash
# In your .env file, ensure:
VITE_ENVIRONMENT=development
```
- When `VITE_ENVIRONMENT=development`, the app uses **mock payments** (no real Stripe calls)
- Mock payments always succeed for testing UI flows
- No backend or real Stripe keys required

**For Production Testing:**
```bash
# In your .env file:
VITE_ENVIRONMENT=production
VITE_STRIPE_PUBLIC_KEY=pk_test_your_actual_test_key
```
- Requires backend server running with valid Stripe secret key
- Uses real Stripe test mode for payment processing

#### 2. Backend Server Issues

If using `VITE_ENVIRONMENT=production`, ensure:

1. **Backend is running:**
   ```bash
   node backend-example.js
   ```

2. **Valid Stripe keys in `.env.backend`:**
   ```bash
   STRIPE_SECRET_KEY=sk_test_your_actual_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

3. **Backend validation passes:**
   - If you see "❌ STRIPE_SECRET_KEY not properly configured", update your keys
   - Remove placeholder values like `your_stripe_secret_key_here`

#### 3. Stripe Configuration Issues

**Missing Public Key:**
- Error: "Stripe failed to initialize"
- Solution: Set `VITE_STRIPE_PUBLIC_KEY` in your `.env` file

**Invalid Keys:**
- Error: "Invalid API key provided"
- Solution: Verify keys in your Stripe Dashboard

**Test vs Live Mode Mismatch:**
- Error: "No such price" or "Invalid price ID"
- Solution: Ensure price IDs match your Stripe Dashboard

## Quick Fixes

### For Local Development (Recommended)
```bash
# 1. Set environment to development
echo "VITE_ENVIRONMENT=development" > .env

# 2. Add any public key (mock mode doesn't validate)
echo "VITE_STRIPE_PUBLIC_KEY=pk_test_mock" >> .env

# 3. Restart frontend
npm run dev
```

### For Real Payment Testing
```bash
# 1. Get test keys from Stripe Dashboard
# 2. Update .env file
VITE_ENVIRONMENT=production
VITE_STRIPE_PUBLIC_KEY=pk_test_your_real_test_key

# 3. Update .env.backend file
STRIPE_SECRET_KEY=sk_test_your_real_secret_key

# 4. Start backend
node backend-example.js

# 5. Restart frontend
npm run dev
```

## Testing Payment Flow

### Mock Mode (Development)
- ✅ Subscription buttons work
- ✅ Checkout flow completes
- ✅ Success/cancel pages load
- ❌ No real payment processing

### Test Mode (Production with Test Keys)
- ✅ Real Stripe checkout
- ✅ Use test card numbers (4242 4242 4242 4242)
- ✅ Webhook events triggered
- ❌ No real money charged

### Live Mode (Production with Live Keys)
- ✅ Real payments processed
- ⚠️ Real money charged
- ✅ Production webhook events

## Debug Steps

1. **Check browser console** for JavaScript errors
2. **Check network tab** for failed API calls
3. **Check backend logs** for Stripe API errors
4. **Verify environment variables** are loaded correctly
5. **Test with Stripe test cards** in test mode

## Need Help?

If you're still experiencing issues:
1. Check the browser console for specific error messages
2. Verify your Stripe Dashboard configuration
3. Ensure webhook endpoints are properly configured
4. Test with different browsers or incognito mode

For production deployment, see `DEPLOYMENT_CHECKLIST.md`.