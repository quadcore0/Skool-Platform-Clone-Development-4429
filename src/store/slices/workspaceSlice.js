import { createSlice } from '@reduxjs/toolkit';
import { generateDemoWorkspaces } from '../../utils/demoData';

const initialState = {
  workspaces: generateDemoWorkspaces(20),
  loading: false,
  error: null,
  selectedWorkspace: null,
  filters: {
    search: '',
    status: 'all',
  }
};

const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    fetchWorkspacesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWorkspacesSuccess: (state, action) => {
      state.loading = false;
      state.workspaces = action.payload;
    },
    fetchWorkspacesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectWorkspace: (state, action) => {
      state.selectedWorkspace = action.payload;
    },
    updateWorkspaceFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    createWorkspace: (state, action) => {
      state.workspaces.push(action.payload);
    },
    updateWorkspace: (state, action) => {
      const index = state.workspaces.findIndex(workspace => workspace.id === action.payload.id);
      if (index !== -1) {
        state.workspaces[index] = { ...state.workspaces[index], ...action.payload };
        if (state.selectedWorkspace && state.selectedWorkspace.id === action.payload.id) {
          state.selectedWorkspace = { ...state.selectedWorkspace, ...action.payload };
        }
      }
    },
    deleteWorkspace: (state, action) => {
      state.workspaces = state.workspaces.filter(workspace => workspace.id !== action.payload);
      if (state.selectedWorkspace && state.selectedWorkspace.id === action.payload) {
        state.selectedWorkspace = null;
      }
    }
  },
});

export const { 
  fetchWorkspacesStart, 
  fetchWorkspacesSuccess, 
  fetchWorkspacesFailure, 
  selectWorkspace,
  updateWorkspaceFilters,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace
} = workspaceSlice.actions;

export default workspaceSlice.reducer;