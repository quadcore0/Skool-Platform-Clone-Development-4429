// Mock implementation for Supabase client
// This allows the application to run without an actual Supabase connection

// Mock storage for users and sessions
const mockStorage = {
  users: [
    // Add default admin user with matching credentials from Login.jsx
    {
      id: '1',
      email: 'admin@example.com',
      password: 'password', // This matches the Login component's default values
      user_metadata: {
        full_name: 'Admin User',
        role: 'admin'
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  
  currentSession: null,
  
  saveUsers() {
    localStorage.setItem('mockUsers', JSON.stringify(this.users));
  },
  
  saveSession(session) {
    this.currentSession = session;
    localStorage.setItem('mockSession', JSON.stringify(session));
  },
  
  clearSession() {
    this.currentSession = null;
    localStorage.removeItem('mockSession');
  },
  
  findUser(email) {
    return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
  },
  
  addUser(userData) {
    const user = {
      id: Date.now().toString(),
      email: userData.email,
      password: userData.password, // In real app, this would be hashed
      user_metadata: userData.options?.data || {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.users.push(user);
    this.saveUsers();
    return user;
  }
};

// Initialize mock storage with demo user
if (!localStorage.getItem('mockUsers')) {
  mockStorage.saveUsers();
}

// Load existing session if available
const existingSession = localStorage.getItem('mockSession');
if (existingSession) {
  try {
    mockStorage.currentSession = JSON.parse(existingSession);
  } catch (e) {
    console.warn('Could not parse existing session');
  }
}

// Mock auth implementation
const supabase = {
  auth: {
    user: mockStorage.currentSession?.user || null,
    session: mockStorage.currentSession,
    callbacks: [],
    
    async getSession() {
      const session = mockStorage.currentSession;
      return { data: { session }, error: null };
    },
    
    onAuthStateChange(callback) {
      this.callbacks.push(callback);
      
      // Immediately call with current session if it exists
      if (mockStorage.currentSession) {
        setTimeout(() => {
          callback('SIGNED_IN', mockStorage.currentSession);
        }, 100);
      }
      
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              this.callbacks = this.callbacks.filter(cb => cb !== callback);
            }
          }
        }
      };
    },
    
    async signUp({ email, password, options = {} }) {
      try {
        // Check if user already exists
        const existingUser = mockStorage.findUser(email);
        if (existingUser) {
          return { data: null, error: { message: 'User already registered' } };
        }
        
        // Create new user
        const newUser = mockStorage.addUser({ email, password, options });
        
        // Create session
        const session = {
          user: newUser,
          access_token: 'mock-token-' + Date.now(),
          refresh_token: 'mock-refresh-token-' + Date.now(),
          expires_at: Date.now() + 3600000
        };
        
        // Save session
        mockStorage.saveSession(session);
        this.user = newUser;
        this.session = session;
        
        // Notify callbacks
        this.callbacks.forEach(callback => {
          callback('SIGNED_IN', session);
        });
        
        console.log('Mock signup successful:', email);
        return { data: { user: newUser, session }, error: null };
      } catch (error) {
        console.error('Signup error:', error);
        return { data: null, error: { message: 'Signup failed' } };
      }
    },
    
    async signInWithPassword({ email, password }) {
      try {
        // Find user
        const user = mockStorage.findUser(email);
        if (!user) {
          return { data: null, error: { message: 'Invalid login credentials' } };
        }
        
        // In a real app, you'd verify the password hash
        // For demo purposes, we'll just check if password matches
        if (user.password !== password) {
          return { data: null, error: { message: 'Invalid login credentials' } };
        }
        
        // Create session
        const session = {
          user: user,
          access_token: 'mock-token-' + Date.now(),
          refresh_token: 'mock-refresh-token-' + Date.now(),
          expires_at: Date.now() + 3600000
        };
        
        // Save session
        mockStorage.saveSession(session);
        this.user = user;
        this.session = session;
        
        // Notify callbacks
        this.callbacks.forEach(callback => {
          callback('SIGNED_IN', session);
        });
        
        console.log('Mock signin successful:', email);
        return { data: { user, session }, error: null };
      } catch (error) {
        console.error('Signin error:', error);
        return { data: null, error: { message: 'Login failed' } };
      }
    },
    
    async signOut() {
      try {
        mockStorage.clearSession();
        this.user = null;
        this.session = null;
        
        // Notify callbacks
        this.callbacks.forEach(callback => {
          callback('SIGNED_OUT', null);
        });
        
        console.log('Mock signout successful');
        return { error: null };
      } catch (error) {
        console.error('Signout error:', error);
        return { error: { message: 'Signout failed' } };
      }
    },
    
    async signInWithOAuth({ provider, options = {} }) {
      console.log(`Mock OAuth sign-in with ${provider} not implemented`);
      return { data: null, error: { message: 'OAuth login not available in mock mode' } };
    },
    
    async resetPasswordForEmail(email, options = {}) {
      console.log(`Mock password reset for ${email} not implemented`);
      return { data: {}, error: null };
    },
    
    async updateUser(updates) {
      if (!this.user) {
        return { data: null, error: { message: 'Not authenticated' } };
      }
      
      try {
        const updatedUser = { ...this.user, ...updates };
        this.user = updatedUser;
        
        // Update in storage
        const userIndex = mockStorage.users.findIndex(u => u.id === updatedUser.id);
        if (userIndex >= 0) {
          mockStorage.users[userIndex] = { ...mockStorage.users[userIndex], ...updatedUser };
          mockStorage.saveUsers();
        }
        
        return { data: { user: updatedUser }, error: null };
      } catch (error) {
        return { data: null, error: { message: 'Update failed' } };
      }
    }
  },
  
  // Mock database operations
  from: (table) => ({
    select: (columns = '*') => ({
      eq: (column, value) => Promise.resolve({ data: [], error: null }),
      order: (column, options) => Promise.resolve({ data: [], error: null }),
      limit: (count) => Promise.resolve({ data: [], error: null }),
      single: () => Promise.resolve({ data: null, error: null })
    }),
    insert: (values) => Promise.resolve({ data: values, error: null }),
    update: (values) => ({
      eq: (column, value) => Promise.resolve({ data: values, error: null })
    }),
    delete: () => ({
      eq: (column, value) => Promise.resolve({ data: null, error: null })
    })
  })
};

export { supabase };