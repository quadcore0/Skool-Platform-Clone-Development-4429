import { createSlice } from '@reduxjs/toolkit';
import { generateDemoSupportTickets } from '../../utils/demoData';

const initialState = {
  tickets: generateDemoSupportTickets(25),
  loading: false,
  error: null,
  selectedTicket: null,
  filters: {
    search: '',
    status: 'all',
    priority: 'all',
  }
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    fetchTicketsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTicketsSuccess: (state, action) => {
      state.loading = false;
      state.tickets = action.payload;
    },
    fetchTicketsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
    updateTicketFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    createTicket: (state, action) => {
      state.tickets.push(action.payload);
    },
    updateTicket: (state, action) => {
      const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = { ...state.tickets[index], ...action.payload };
        if (state.selectedTicket && state.selectedTicket.id === action.payload.id) {
          state.selectedTicket = { ...state.selectedTicket, ...action.payload };
        }
      }
    },
    addTicketResponse: (state, action) => {
      const { ticketId, response } = action.payload;
      const index = state.tickets.findIndex(ticket => ticket.id === ticketId);
      if (index !== -1) {
        if (!state.tickets[index].responses) {
          state.tickets[index].responses = [];
        }
        state.tickets[index].responses.push(response);
        state.tickets[index].updatedAt = new Date().toISOString();
        
        if (state.selectedTicket && state.selectedTicket.id === ticketId) {
          if (!state.selectedTicket.responses) {
            state.selectedTicket.responses = [];
          }
          state.selectedTicket.responses.push(response);
          state.selectedTicket.updatedAt = new Date().toISOString();
        }
      }
    },
    deleteTicket: (state, action) => {
      state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
      if (state.selectedTicket && state.selectedTicket.id === action.payload) {
        state.selectedTicket = null;
      }
    }
  },
});

export const { 
  fetchTicketsStart, 
  fetchTicketsSuccess, 
  fetchTicketsFailure, 
  selectTicket,
  updateTicketFilters,
  createTicket,
  updateTicket,
  addTicketResponse,
  deleteTicket
} = supportSlice.actions;

export default supportSlice.reducer;