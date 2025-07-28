import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // When the user is authenticated, update the Redux store with user info
  useEffect(() => {
    if (user) {
      // Map the user from AuthContext to the format expected by Redux
      const reduxUser = {
        id: user.id,
        name: user.user_metadata?.full_name || 'Admin User',
        email: user.email,
        role: user.user_metadata?.role || 'admin',
        avatar: user.user_metadata?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'
      };
      
      dispatch(loginSuccess(reduxUser));
    }
  }, [user, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    // Redirect to login with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;