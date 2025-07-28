import React from 'react';

const Logo = ({ collapsed }) => {
  return (
    <div className="flex items-center">
      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
        <span className="text-lg font-bold text-white">A</span>
      </div>
      {!collapsed && (
        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Admin</span>
      )}
    </div>
  );
};

export default Logo;