// Mock backend service for Stripe integration
// In a real application, these would be actual backend API endpoints

export interface CheckoutSession {
  id: string;
  url: string;
  success_url: string;
  cancel_url: string;
}

// Mock function to simulate creating a Stripe checkout session
export const createMockCheckoutSession = async (priceId: string): Promise<CheckoutSession> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real implementation, this would call your backend API
  // which would create an actual Stripe checkout session
  const sessionId = `cs_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    id: sessionId,
    url: `https://checkout.stripe.com/pay/${sessionId}`,
    success_url: `${window.location.origin}/success`,
    cancel_url: `${window.location.origin}/cancel`
  };
};

// Mock function to verify payment status
export const verifyPaymentStatus = async (sessionId: string): Promise<{ status: 'paid' | 'unpaid' | 'cancelled' }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // For demo purposes, always return 'paid'
  return { status: 'paid' };
};

// Mock webhook handler for Stripe events
export const handleStripeWebhook = async (event: any) => {
  console.log('Mock webhook received:', event.type);
  
  switch (event.type) {
    case 'checkout.session.completed':
      console.log('Payment successful for session:', event.data.object.id);
      // In a real app, you would update the user's subscription in your database
      break;
    case 'invoice.payment_succeeded':
      console.log('Recurring payment successful');
      break;
    case 'invoice.payment_failed':
      console.log('Payment failed');
      break;
    default:
      console.log('Unhandled event type:', event.type);
  }
};

// Configuration for different environments
export const getBackendConfig = () => {
  const isDevelopment = import.meta.env.DEV;
  const environment = import.meta.env.VITE_ENVIRONMENT || 'development';
  
  return {
    apiUrl: import.meta.env.VITE_API_URL || (isDevelopment ? 'http://localhost:3001/api' : '/api'),
    stripeWebhookEndpoint: import.meta.env.VITE_WEBHOOK_URL || '/webhook/stripe',
    useMockData: environment === 'development', // Use mock data only in development
    stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
    environment
  };
};