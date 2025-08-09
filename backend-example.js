// Example backend implementation for Stripe checkout
// This file demonstrates how to use the private key securely on the server

// Load environment variables from .env.backend
require('dotenv').config({ path: '.env.backend' });
const express = require('express');

// Validate Stripe configuration
if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('your_') || process.env.STRIPE_SECRET_KEY.includes('_here')) {
  console.error('❌ STRIPE_SECRET_KEY not properly configured in .env.backend');
  console.log('Please set your actual Stripe secret key in .env.backend');
  process.exit(1);
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use the private key from environment
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create checkout session endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      customer_email: req.body.customerEmail, // Optional: pre-fill customer email
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint to handle Stripe events
app.post('/webhook/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment successful for session:', session.id);
      // Update user subscription in your database
      break;
    case 'invoice.payment_succeeded':
      console.log('Recurring payment successful');
      break;
    case 'invoice.payment_failed':
      console.log('Payment failed');
      // Handle failed payment (e.g., send email, suspend account)
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

const PORT = process.env.PORT || 3001;

// For local development
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless functions
module.exports = app;

// Example .env file for backend:
// STRIPE_SECRET_KEY=your_stripe_secret_key_here
// STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
// CLIENT_URL=http://localhost:3000
// PORT=3001