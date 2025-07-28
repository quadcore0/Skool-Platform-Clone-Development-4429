import { createSlice } from '@reduxjs/toolkit';
import { generateDemoApiKeys } from '../../utils/demoData';

const initialState = {
  apiKeys: generateDemoApiKeys(10),
  loading: false,
  error: null,
  selectedApiKey: null,
  filters: {
    search: '',
    status: 'all',
  }
};

const apiKeySlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    fetchApiKeysStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchApiKeysSuccess: (state, action) => {
      state.loading = false;
      state.apiKeys = action.payload;
    },
    fetchApiKeysFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectApiKey: (state, action) => {
      state.selectedApiKey = action.payload;
    },
    updateApiKeyFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    createApiKey: (state, action) => {
      state.apiKeys.push(action.payload);
    },
    updateApiKey: (state, action) => {
      const index = state.apiKeys.findIndex(apiKey => apiKey.id === action.payload.id);
      if (index !== -1) {
        state.apiKeys[index] = { ...state.apiKeys[index], ...action.payload };
        if (state.selectedApiKey && state.selectedApiKey.id === action.payload.id) {
          state.selectedApiKey = { ...state.selectedApiKey, ...action.payload };
        }
      }
    },
    revokeApiKey: (state, action) => {
      const index = state.apiKeys.findIndex(apiKey => apiKey.id === action.payload);
      if (index !== -1) {
        state.apiKeys[index].status = 'revoked';
        state.apiKeys[index].revokedAt = new Date().toISOString();
      }
    },
    deleteApiKey: (state, action) => {
      state.apiKeys = state.apiKeys.filter(apiKey => apiKey.id !== action.payload);
      if (state.selectedApiKey && state.selectedApiKey.id === action.payload) {
        state.selectedApiKey = null;
      }
    }
  },
});

export const { 
  fetchApiKeysStart, 
  fetchApiKeysSuccess, 
  fetchApiKeysFailure, 
  selectApiKey,
  updateApiKeyFilters,
  createApiKey,
  updateApiKey,
  revokeApiKey,
  deleteApiKey
} = apiKeySlice.actions;

export default apiKeySlice.reducer;