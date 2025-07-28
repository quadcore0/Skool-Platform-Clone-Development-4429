import React from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {toggleSidebar} from '../../store/slices/uiSlice';
import Logo from '../UI/Logo';

// Icons
import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  FolderIcon,
  TagIcon,
  KeyIcon,
  BellIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const dispatch = useDispatch();
  const {sidebarCollapsed} = useSelector((state) => state.ui);

  const navItems = [
    {name: 'Dashboard', path: '/app/dashboard', icon: HomeIcon},
    {name: 'Users', path: '/app/users', icon: UsersIcon},
    {name: 'Subscriptions', path: '/app/subscriptions', icon: CreditCardIcon},
    {name: 'Workspaces', path: '/app/workspaces', icon: FolderIcon},
    {name: 'Feature Toggles', path: '/app/features', icon: TagIcon},
    {name: 'API Keys', path: '/app/api-keys', icon: KeyIcon},
    {name: 'Notifications', path: '/app/notifications', icon: BellIcon},
    {name: 'Analytics', path: '/app/analytics', icon: ChartBarIcon},
    {name: 'Support', path: '/app/support', icon: ChatBubbleLeftRightIcon},
    {name: 'Settings', path: '/app/settings', icon: Cog6ToothIcon},
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-800 shadow-md transition-width duration-300 ease-in-out ${
      sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
    }`}>
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Logo collapsed={sidebarCollapsed} />
          </div>
          <button
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            onClick={() => dispatch(toggleSidebar())}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRightIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({isActive}) => `
                    flex items-center px-3 py-2.5 rounded-lg transition-colors
                    ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 dark:text-blue-500 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="ml-3 whitespace-nowrap">{item.name}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Version Info */}
        {!sidebarCollapsed && (
          <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
            Version 1.0.0
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;