import { create } from 'zustand';
import { SubscriptionPlan } from '../types';
import { supabase } from '../config/supabase';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface SubscriptionState {
  currentPlan: SubscriptionPlan | null;
  isLoading: boolean;
  error: string | null;
  plans: SubscriptionPlan[];
  fetchCurrentPlan: () => Promise<void>;
  subscribeToPlan: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  updatePaymentMethod: (paymentMethodId: string) => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  currentPlan: null,
  isLoading: false,
  error: null,
  plans: [
    {
      id: 'basic',
      name: 'Basic',
      price: 5.99,
      quality: '720p',
      maxDevices: 1,
      features: ['Watch on 1 device', 'HD quality', 'Cancel anytime'],
      isActive: false,
      renewalDate: '',
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 9.99,
      quality: '1080p',
      maxDevices: 2,
      features: ['Watch on 2 devices', 'Full HD quality', 'Download videos', 'Cancel anytime'],
      isActive: false,
      renewalDate: '',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 14.99,
      quality: '4K',
      maxDevices: 4,
      features: ['Watch on 4 devices', '4K Ultra HD', 'Download videos', 'Cancel anytime', 'HDR content'],
      isActive: false,
      renewalDate: '',
    },
  ],

  fetchCurrentPlan: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*')
        .single();

      if (error) throw error;

      if (subscription) {
        set({
          currentPlan: subscription as SubscriptionPlan,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  subscribeToPlan: async (planId: string) => {
    try {
      set({ isLoading: true, error: null });

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Create checkout session
      const { data: session, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { planId },
      });

      if (error) throw error;

      // Redirect to checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) throw result.error;

    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  cancelSubscription: async () => {
    try {
      set({ isLoading: true, error: null });

      const { error } = await supabase.functions.invoke('cancel-subscription');

      if (error) throw error;

      set({
        currentPlan: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updatePaymentMethod: async (paymentMethodId: string) => {
    try {
      set({ isLoading: true, error: null });

      const { error } = await supabase.functions.invoke('update-payment-method', {
        body: { paymentMethodId },
      });

      if (error) throw error;

      set({ isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));