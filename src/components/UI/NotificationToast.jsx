import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeUiNotification } from '../../store/slices/uiSlice';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const NotificationToast = ({ notification }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  
  // Auto-dismiss after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, notification.duration || 5000);
    
    return () => clearTimeout(timer);
  }, [notification.duration]);
  
  // Handle animation end
  const handleAnimationEnd = () => {
    if (!isVisible) {
      dispatch(removeUiNotification(notification.id));
    }
  };
  
  // Close notification
  const handleClose = () => {
    setIsVisible(false);
  };
  
  // Get icon based on type
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <ExclamationCircleIcon className="w-5 h-5 text-red-500" />;
      case 'info':
      default:
        return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
    }
  };
  
  // Get background color based on type
  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div
      className={`
        max-w-md w-full border rounded-lg shadow-lg pointer-events-auto flex
        transition-opacity duration-300 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${getBgColor()}
      `}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {getIcon()}
          </div>
          <div className="ml-3 flex-1">
            {notification.title && (
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {notification.title}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {notification.message}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200 dark:border-gray-700">
        <button
          onClick={handleClose}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;