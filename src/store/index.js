import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import workspaceReducer from './slices/workspaceSlice';
import subscriptionReducer from './slices/subscriptionSlice';
import featureReducer from './slices/featureSlice';
import apiKeyReducer from './slices/apiKeySlice';
import notificationReducer from './slices/notificationSlice';
import supportReducer from './slices/supportSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    workspaces: workspaceReducer,
    subscriptions: subscriptionReducer,
    features: featureReducer,
    apiKeys: apiKeyReducer,
    notifications: notificationReducer,
    support: supportReducer,
    ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;