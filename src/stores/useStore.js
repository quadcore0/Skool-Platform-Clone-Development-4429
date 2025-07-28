import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Main app store
export const useAppStore = create(
  persist(
    (set, get) => ({
      // UI State
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      // User preferences
      preferences: {
        notifications: true,
        emailDigest: true,
        darkMode: false,
      },
      setPreferences: (prefs) => set({ preferences: { ...get().preferences, ...prefs } }),
      
      // Active community
      activeCommunity: null,
      setActiveCommunity: (community) => set({ activeCommunity: community }),
      
      // Search state
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      // Notifications
      notifications: [],
      addNotification: (notification) => set((state) => ({
        notifications: [{ id: Date.now(), ...notification }, ...state.notifications]
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        )
      })),
    }),
    {
      name: 'skool-app-storage',
      partialize: (state) => ({
        preferences: state.preferences,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

// Communities store
export const useCommunitiesStore = create((set, get) => ({
  communities: [],
  currentCommunity: null,
  loading: false,
  
  setCommunities: (communities) => set({ communities }),
  setCurrentCommunity: (community) => set({ currentCommunity: community }),
  setLoading: (loading) => set({ loading }),
  
  addCommunity: (community) => set((state) => ({
    communities: [...state.communities, community]
  })),
  
  updateCommunity: (id, updates) => set((state) => ({
    communities: state.communities.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ),
    currentCommunity: state.currentCommunity?.id === id 
      ? { ...state.currentCommunity, ...updates } 
      : state.currentCommunity
  })),
  
  removeCommunity: (id) => set((state) => ({
    communities: state.communities.filter(c => c.id !== id),
    currentCommunity: state.currentCommunity?.id === id ? null : state.currentCommunity
  })),
}));

// Courses store
export const useCoursesStore = create((set, get) => ({
  courses: [],
  currentCourse: null,
  currentLesson: null,
  progress: {},
  
  setCourses: (courses) => set({ courses }),
  setCurrentCourse: (course) => set({ currentCourse: course }),
  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
  
  updateProgress: (courseId, lessonId, progress) => set((state) => ({
    progress: {
      ...state.progress,
      [courseId]: {
        ...state.progress[courseId],
        [lessonId]: progress
      }
    }
  })),
  
  addCourse: (course) => set((state) => ({
    courses: [...state.courses, course]
  })),
}));

// Forum store
export const useForumStore = create((set, get) => ({
  posts: [],
  currentPost: null,
  loading: false,
  
  setPosts: (posts) => set({ posts }),
  setCurrentPost: (post) => set({ currentPost: post }),
  setLoading: (loading) => set({ loading }),
  
  addPost: (post) => set((state) => ({
    posts: [post, ...state.posts]
  })),
  
  updatePost: (id, updates) => set((state) => ({
    posts: state.posts.map(p => p.id === id ? { ...p, ...updates } : p),
    currentPost: state.currentPost?.id === id 
      ? { ...state.currentPost, ...updates } 
      : state.currentPost
  })),
  
  deletePost: (id) => set((state) => ({
    posts: state.posts.filter(p => p.id !== id),
    currentPost: state.currentPost?.id === id ? null : state.currentPost
  })),
}));