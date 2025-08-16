// Example backend implementation for Stripe checkout
// This file demonstrates how to use the private key securely on the server

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

// Validate Stripe configuration
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
  process.exit(1);
}

// Warn about placeholder keys but allow in development
if (process.env.STRIPE_SECRET_KEY.includes('placeholder') || process.env.STRIPE_SECRET_KEY.includes('your_') || process.env.STRIPE_SECRET_KEY.includes('_here')) {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ STRIPE_SECRET_KEY not properly configured for production');
    console.log('Please set your actual Stripe secret key in environment variables');
    process.exit(1);
  } else {
    console.warn('⚠️  Using placeholder Stripe key in development mode');
    console.warn('   Payment functionality will not work until you set real keys');
  }
}

// Initialize Stripe (handle placeholder keys gracefully)
let stripe;
try {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} catch (error) {
  if (process.env.NODE_ENV === 'development' && process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
    console.warn('⚠️  Stripe initialization skipped due to placeholder key');
    stripe = null;
  } else {
    console.error('❌ Failed to initialize Stripe:', error.message);
    process.exit(1);
  }
}

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'RemoteMind Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      checkout: '/api/create-checkout-session',
      webhook: '/webhook/stripe'
    }
  });
});

// Create checkout session endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' });
    }

    if (!stripe) {
      return res.status(503).json({ 
        error: 'Payment service unavailable', 
        message: 'Stripe not configured properly' 
      });
    }

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

// Start server (for Render, Railway, etc.)
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

// Export for compatibility
export default app;

// Example .env file for backend:
// STRIPE_SECRET_KEY=your_stripe_secret_key_here
// STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
// CLIENT_URL=http://localhost:3000
// PORT=3001