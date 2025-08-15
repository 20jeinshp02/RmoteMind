import { loadStripe } from '@stripe/stripe-js';
import { createMockCheckoutSession, getBackendConfig } from './mockBackend';

// Initialize Stripe with your public key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Price IDs for different subscription plans (these would come from your Stripe dashboard)
export const stripePriceIds = {
  basic: 'price_1234567890abcdef', // Replace with actual price ID
  premium: 'price_abcdef1234567890', // Replace with actual price ID
  enterprise: 'price_fedcba0987654321' // Replace with actual price ID
};

// Function to create a checkout session
export const createCheckoutSession = async (priceId: string) => {
  const config = getBackendConfig();
  
  if (config.useMockData) {
    // Use mock data in development
    return await createMockCheckoutSession(priceId);
  }
  
  // In production, call your actual backend API
  const response = await fetch(`${config.apiUrl}/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }
  
  return await response.json();
};

// Function to redirect to Stripe Checkout
export const redirectToCheckout = async (priceId: string) => {
  try {
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    const config = getBackendConfig();
    
    if (config.useMockData) {
      // For demo purposes in development, simulate the checkout flow
      console.log(`Simulating payment for price ID: ${priceId}`);
      
      // Simulate a delay for payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment and redirect
      window.location.href = '/success';
      return { success: true, message: 'Payment successful (simulated)' };
    }
    
    // In production, create actual checkout session and redirect
    const session = await createCheckoutSession(priceId);
    
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    
    return result;
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
};