import React, { useState } from 'react';
import { X, Check, CreditCard, Loader } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { redirectToCheckout, stripePriceIds } from '../services/stripeService';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const { subscriptionPlans, upgradePlan, currentPlan } = useSubscription();
  const [loading, setLoading] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpgrade = async (planId: string) => {
    if (planId === 'free') {
      upgradePlan(planId);
      onClose();
      return;
    }

    setLoading(planId);
    try {
      // Get the corresponding Stripe price ID
      const priceId = stripePriceIds[planId as keyof typeof stripePriceIds];
      if (!priceId) {
        throw new Error('Price ID not found for plan');
      }

      // Redirect to Stripe Checkout
      await redirectToCheckout(priceId);
      
      // For demo purposes, simulate successful payment
      setTimeout(() => {
        upgradePlan(planId);
        onClose();
        setLoading(null);
      }, 1000);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-20">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plans */}
        <div className="p-6">
          <div className="space-y-4">
            {subscriptionPlans.map((plan) => (
              <div key={plan.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <p className="text-2xl font-bold">${plan.price}/month</p>
                  </div>
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={currentPlan === plan.id || loading === plan.id}
                    className={`px-4 py-2 rounded font-medium flex items-center gap-2 ${
                      currentPlan === plan.id
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : loading === plan.id
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {loading === plan.id ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : currentPlan === plan.id ? (
                      'Current Plan'
                    ) : plan.price > 0 ? (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Subscribe
                      </>
                    ) : (
                      'Choose Plan'
                    )}
                  </button>
                </div>
                <ul className="space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;