import { createSlice } from '@reduxjs/toolkit';
import { generateDemoNotifications } from '../../utils/demoData';

const initialState = {
  notifications: generateDemoNotifications(20),
  loading: false,
  error: null,
  selectedNotification: null,
  filters: {
    search: '',
    type: 'all',
    status: 'all',
  }
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    fetchNotificationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNotificationsSuccess: (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
    },
    fetchNotificationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectNotification: (state, action) => {
      state.selectedNotification = action.payload;
    },
    updateNotificationFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    createNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    updateNotification: (state, action) => {
      const index = state.notifications.findIndex(notification => notification.id === action.payload.id);
      if (index !== -1) {
        state.notifications[index] = { ...state.notifications[index], ...action.payload };
        if (state.selectedNotification && state.selectedNotification.id === action.payload.id) {
          state.selectedNotification = { ...state.selectedNotification, ...action.payload };
        }
      }
    },
    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
      if (state.selectedNotification && state.selectedNotification.id === action.payload) {
        state.selectedNotification = null;
      }
    }
  },
});

export const { 
  fetchNotificationsStart, 
  fetchNotificationsSuccess, 
  fetchNotificationsFailure, 
  selectNotification,
  updateNotificationFilters,
  createNotification,
  updateNotification,
  deleteNotification
} = notificationSlice.actions;

export default notificationSlice.reducer;