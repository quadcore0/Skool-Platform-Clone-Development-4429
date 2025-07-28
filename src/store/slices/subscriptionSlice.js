import { createSlice } from '@reduxjs/toolkit';
import { generateDemoSubscriptions } from '../../utils/demoData';

const initialState = {
  subscriptions: generateDemoSubscriptions(30),
  plans: [
    { id: 'free', name: 'Free', price: 0, features: ['Basic access', '5 users', '1 workspace'] },
    { id: 'starter', name: 'Starter', price: 19, features: ['Full access', '10 users', '3 workspaces', 'Email support'] },
    { id: 'pro', name: 'Professional', price: 49, features: ['Full access', '25 users', '10 workspaces', 'Priority support', 'API access'] },
    { id: 'enterprise', name: 'Enterprise', price: 99, features: ['Full access', 'Unlimited users', 'Unlimited workspaces', 'Dedicated support', 'Custom integrations'] },
  ],
  loading: false,
  error: null,
  selectedSubscription: null,
  filters: {
    search: '',
    status: 'all',
    plan: 'all',
  }
};

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    fetchSubscriptionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSubscriptionsSuccess: (state, action) => {
      state.loading = false;
      state.subscriptions = action.payload;
    },
    fetchSubscriptionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectSubscription: (state, action) => {
      state.selectedSubscription = action.payload;
    },
    updateSubscriptionFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    createSubscription: (state, action) => {
      state.subscriptions.push(action.payload);
    },
    updateSubscription: (state, action) => {
      const index = state.subscriptions.findIndex(subscription => subscription.id === action.payload.id);
      if (index !== -1) {
        state.subscriptions[index] = { ...state.subscriptions[index], ...action.payload };
        if (state.selectedSubscription && state.selectedSubscription.id === action.payload.id) {
          state.selectedSubscription = { ...state.selectedSubscription, ...action.payload };
        }
      }
    },
    deleteSubscription: (state, action) => {
      state.subscriptions = state.subscriptions.filter(subscription => subscription.id !== action.payload);
      if (state.selectedSubscription && state.selectedSubscription.id === action.payload) {
        state.selectedSubscription = null;
      }
    }
  },
});

export const { 
  fetchSubscriptionsStart, 
  fetchSubscriptionsSuccess, 
  fetchSubscriptionsFailure, 
  selectSubscription,
  updateSubscriptionFilters,
  createSubscription,
  updateSubscription,
  deleteSubscription
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;