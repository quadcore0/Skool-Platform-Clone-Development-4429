import { createSlice } from '@reduxjs/toolkit';
import { generateDemoUsers } from '../../utils/demoData';

const initialState = {
  users: generateDemoUsers(50),
  loading: false,
  error: null,
  selectedUser: null,
  filters: {
    search: '',
    status: 'all',
    role: 'all',
  }
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateUserFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    createUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
        if (state.selectedUser && state.selectedUser.id === action.payload.id) {
          state.selectedUser = { ...state.selectedUser, ...action.payload };
        }
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      if (state.selectedUser && state.selectedUser.id === action.payload) {
        state.selectedUser = null;
      }
    }
  },
});

export const { 
  fetchUsersStart, 
  fetchUsersSuccess, 
  fetchUsersFailure, 
  selectUser,
  updateUserFilters,
  createUser,
  updateUser,
  deleteUser
} = userSlice.actions;

export default userSlice.reducer;