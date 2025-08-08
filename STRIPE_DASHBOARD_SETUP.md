# Stripe Dashboard Configuration Guide

This guide walks you through setting up real price IDs and webhooks in your Stripe Dashboard.

## 🏷️ Step 1: Create Subscription Products & Price IDs

### 1. Login to Stripe Dashboard
- Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
- Login with your Stripe account

### 2. Create Products
Navigate to **Products** → **Add Product**

#### Basic Plan
- **Name**: "Basic Plan"
- **Description**: "5 AI Therapist sessions per month"
- **Pricing Model**: Recurring
- **Price**: $9.99 USD
- **Billing Period**: Monthly
- **Copy the Price ID** (starts with `price_1RtyonLC2SGImPo4bueyLlqw`)

#### Premium Plan
- **Name**: "Premium Plan"
- **Description**: "15 AI Therapist sessions per month"
- **Pricing Model**: Recurring
- **Price**: $19.99 USD
- **Billing Period**: Monthly
- **Copy the Price ID** (starts with `price_1RtypiLC2SGImPo4QUdbUkCY`)

#### Enterprise Plan

- **Name**: "Enterprise Plan"
- **Description**: "Unlimited AI Therapist sessions"
- **Pricing Model**: Recurring
- **Price**: $39.99 USD
- **Billing Period**: Monthly
- **Copy the Price ID** (starts with `price_1RtyqoLC2SGImPo4DxxG9Ptf`)

### 3. Update Your Code
Replace the placeholder price IDs in `src/services/stripeService.ts`:

```javascript
export const stripePriceIds = {
  basic: 'price_YOUR_BASIC_PRICE_ID',     // Replace with actual Basic price ID
  premium: 'price_YOUR_PREMIUM_PRICE_ID', // Replace with actual Premium price ID
  enterprise: 'price_YOUR_ENTERPRISE_PRICE_ID' // Replace with actual Enterprise price ID
};
```

## 🔗 Step 2: Configure Webhooks

### 1. Navigate to Webhooks
- Go to **Developers** → **Webhooks**
- Click **Add endpoint**

### 2. Webhook Configuration

#### For Local Development:
- **Endpoint URL**: `http://localhost:3001/webhook/stripe`
- **Description**: "Local development webhook"

#### For Production:
- **Endpoint URL**: `https://remotemind.online/webhook/stripe`
- **Description**: "Production webhook"

### 3. Select Events
Choose these events to listen for:
- ✅ `checkout.session.completed`
- ✅ `invoice.payment_succeeded`
- ✅ `invoice.payment_failed`
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`

### 4. Get Webhook Secret
- After creating the webhook, click on it
- Copy the **Signing secret** (starts with `whsec_`)
- Update your `.env.backend` file:

```env
STRIPE_WEBHOOK_SECRET=whsec_FkrqzAAhcz4Jmr9ZQ2jH00evRsVbfVGT
```

## 🧪 Step 3: Test Your Setup

### 1. Test Cards (for testing mode)
Use these test card numbers:
- **Success**: `4242424242424242`
- **Decline**: `4000000000000002`
- **3D Secure**: `4000002500003155`

### 2. Test the Flow
1. Open your app: `http://localhost:3000`
2. Click "See Plans"
3. Select a subscription plan
4. Use test card details
5. Complete the checkout
6. Verify webhook events in Stripe Dashboard

## 🚀 Step 4: Go Live

### 1. Activate Your Account
- Complete Stripe account verification
- Provide business information
- Add bank account details

### 2. Switch to Live Mode
- Toggle from "Test mode" to "Live mode" in Stripe Dashboard
- Update your keys in environment files:
  - Use `pk_live_...` for public key
  - Use `sk_live_...` for secret key (already configured)

### 3. Update Webhook URLs
- Create new webhook endpoint for production domain
- Update webhook URL from localhost to your live domain

## 📊 Step 5: Monitor & Analytics

### Stripe Dashboard Features
- **Payments**: Track all transactions
- **Subscriptions**: Monitor active subscriptions
- **Customers**: Manage customer data
- **Analytics**: Revenue and growth metrics
- **Logs**: Debug webhook deliveries

### Key Metrics to Watch
- Monthly Recurring Revenue (MRR)
- Churn rate
- Failed payment rate
- Webhook delivery success rate

## 🔧 Troubleshooting

### Common Issues

1. **Webhook not receiving events**
   - Check endpoint URL is publicly accessible
   - Verify webhook secret is correct
   - Check Stripe Dashboard → Webhooks → Attempts

2. **Payment fails**
   - Verify price IDs are correct
   - Check if account is activated for live payments
   - Review Stripe Dashboard logs

3. **Subscription not updating**
   - Check webhook event handling in backend
   - Verify database updates in webhook handler
   - Review server logs for errors

### Debug Commands

```bash
# Check webhook deliveries
curl -X GET https://api.stripe.com/v1/webhook_endpoints/we_xxx/delivery_attempts \
  -u sk_live_xxx:

# Test webhook locally (install Stripe CLI)
stripe listen --forward-to localhost:3001/webhook/stripe
```

## 📞 Support Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)
- [Stripe Community](https://github.com/stripe)
- [Webhook Testing Tool](https://webhook.site)

---

**Ready to process real payments?** Follow these steps and you'll be live in no time! 🎉