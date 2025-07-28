import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarCollapsed: false,
  theme: 'light',
  notifications: [],
  modals: {
    createUser: false,
    createWorkspace: false,
    createSubscription: false,
    createFeature: false,
    createApiKey: false,
    createNotification: false,
    createTicket: false,
    deleteConfirmation: {
      isOpen: false,
      itemType: null,
      itemId: null,
      itemName: null,
    },
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    addUiNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeUiNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    openModal: (state, action) => {
      const { modal, data } = action.payload;
      if (modal === 'deleteConfirmation') {
        state.modals.deleteConfirmation = {
          isOpen: true,
          ...data,
        };
      } else {
        state.modals[modal] = true;
      }
    },
    closeModal: (state, action) => {
      const modal = action.payload;
      if (modal === 'deleteConfirmation') {
        state.modals.deleteConfirmation = {
          isOpen: false,
          itemType: null,
          itemId: null,
          itemName: null,
        };
      } else {
        state.modals[modal] = false;
      }
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setTheme,
  addUiNotification,
  removeUiNotification,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;