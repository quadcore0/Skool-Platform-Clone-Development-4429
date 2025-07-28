import { createSlice } from '@reduxjs/toolkit';
import { generateDemoFeatures } from '../../utils/demoData';

const initialState = {
  features: generateDemoFeatures(15),
  loading: false,
  error: null,
  selectedFeature: null,
  filters: {
    search: '',
    status: 'all',
    type: 'all',
  }
};

const featureSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    fetchFeaturesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFeaturesSuccess: (state, action) => {
      state.loading = false;
      state.features = action.payload;
    },
    fetchFeaturesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectFeature: (state, action) => {
      state.selectedFeature = action.payload;
    },
    updateFeatureFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    createFeature: (state, action) => {
      state.features.push(action.payload);
    },
    updateFeature: (state, action) => {
      const index = state.features.findIndex(feature => feature.id === action.payload.id);
      if (index !== -1) {
        state.features[index] = { ...state.features[index], ...action.payload };
        if (state.selectedFeature && state.selectedFeature.id === action.payload.id) {
          state.selectedFeature = { ...state.selectedFeature, ...action.payload };
        }
      }
    },
    toggleFeature: (state, action) => {
      const { featureId, enabled } = action.payload;
      const index = state.features.findIndex(feature => feature.id === featureId);
      if (index !== -1) {
        state.features[index].enabled = enabled;
      }
    },
    deleteFeature: (state, action) => {
      state.features = state.features.filter(feature => feature.id !== action.payload);
      if (state.selectedFeature && state.selectedFeature.id === action.payload) {
        state.selectedFeature = null;
      }
    }
  },
});

export const { 
  fetchFeaturesStart, 
  fetchFeaturesSuccess, 
  fetchFeaturesFailure, 
  selectFeature,
  updateFeatureFilters,
  createFeature,
  updateFeature,
  toggleFeature,
  deleteFeature
} = featureSlice.actions;

export default featureSlice.reducer;