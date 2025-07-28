import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Provider} from 'react-redux';
import {AuthProvider} from './contexts/AuthContext';
import {ThemeProvider} from './contexts/ThemeContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import UserManagement from './pages/UserManagement/UserManagement';
import UserDetail from './pages/UserManagement/UserDetail';
import Subscriptions from './pages/Subscriptions/Subscriptions';
import SubscriptionDetail from './pages/Subscriptions/SubscriptionDetail';
import Workspaces from './pages/Workspaces/Workspaces';
import WorkspaceDetail from './pages/Workspaces/WorkspaceDetail';
import FeatureToggles from './pages/FeatureToggles/FeatureToggles';
import ApiKeys from './pages/ApiKeys/ApiKeys';
import Notifications from './pages/Notifications/Notifications';
import Analytics from './pages/Analytics/Analytics';
import Settings from './pages/Settings/Settings';
import Support from './pages/Support/Support';
import SupportTicket from './pages/Support/SupportTicket';
import Communities from './pages/Communities/Communities';
import CommunityDetail from './pages/Communities/CommunityDetail';
import CreateCommunity from './pages/Communities/CreateCommunity';
import Course from './pages/Courses/Course';
import CourseLesson from './pages/Courses/CourseLesson';
import CreateCourse from './pages/Courses/CreateCourse';
import Events from './pages/Events/Events';
import EventDetail from './pages/Events/EventDetail';
import Forum from './pages/Forum/Forum';
import ForumPost from './pages/Forum/ForumPost';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NotFound from './pages/NotFound';
import {store} from './store';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/app" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* User Management */}
              <Route path="users">
                <Route index element={<UserManagement />} />
                <Route path=":userId" element={<UserDetail />} />
              </Route>
              
              {/* Subscriptions */}
              <Route path="subscriptions">
                <Route index element={<Subscriptions />} />
                <Route path=":subscriptionId" element={<SubscriptionDetail />} />
              </Route>
              
              {/* Workspaces */}
              <Route path="workspaces">
                <Route index element={<Workspaces />} />
                <Route path=":workspaceId" element={<WorkspaceDetail />} />
              </Route>
              
              {/* Communities */}
              <Route path="communities">
                <Route index element={<Communities />} />
                <Route path="create" element={<CreateCommunity />} />
                <Route path=":id" element={<CommunityDetail />} />
                <Route path=":id/courses">
                  <Route index element={<Course />} />
                  <Route path="create" element={<CreateCourse />} />
                  <Route path=":courseId" element={<Course />} />
                  <Route path=":courseId/lessons/:lessonId" element={<CourseLesson />} />
                </Route>
                <Route path=":id/events">
                  <Route index element={<Events />} />
                  <Route path=":eventId" element={<EventDetail />} />
                </Route>
                <Route path=":id/forum">
                  <Route index element={<Forum />} />
                  <Route path=":postId" element={<ForumPost />} />
                </Route>
              </Route>
              
              {/* Other routes */}
              <Route path="features" element={<FeatureToggles />} />
              <Route path="api-keys" element={<ApiKeys />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="support">
                <Route index element={<Support />} />
                <Route path=":ticketId" element={<SupportTicket />} />
              </Route>
              <Route path="profile/:userId" element={<Profile />} />
              <Route path="search" element={<Search />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* Admin panel routes (legacy) - Redirect to /app paths */}
            <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
            <Route path="/users" element={<Navigate to="/app/users" replace />} />
            <Route path="/subscriptions" element={<Navigate to="/app/subscriptions" replace />} />
            <Route path="/workspaces" element={<Navigate to="/app/workspaces" replace />} />
            <Route path="/features" element={<Navigate to="/app/features" replace />} />
            <Route path="/api-keys" element={<Navigate to="/app/api-keys" replace />} />
            <Route path="/notifications" element={<Navigate to="/app/notifications" replace />} />
            <Route path="/analytics" element={<Navigate to="/app/analytics" replace />} />
            <Route path="/support" element={<Navigate to="/app/support" replace />} />
            <Route path="/settings" element={<Navigate to="/app/settings" replace />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;