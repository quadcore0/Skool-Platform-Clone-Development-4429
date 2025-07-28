import React, {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import {setSidebarCollapsed} from '../../store/slices/uiSlice';
import NotificationToast from '../UI/NotificationToast';

const Layout = () => {
  const dispatch = useDispatch();
  const {sidebarCollapsed} = useSelector((state) => state.ui);
  const {notifications} = useSelector((state) => state.ui);

  // Handle window resize to collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(setSidebarCollapsed(true));
      }
    };

    // Initial check
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
        sidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        {/* Top Bar */}
        <TopBar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
};

export default Layout;