import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = 'full',
  className = '',
  dot = false,
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center font-medium';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400',
  };
  
  // Size classes
  const sizeClasses = {
    xs: dot ? 'text-xs' : 'px-1.5 py-0.5 text-xs',
    sm: dot ? 'text-sm' : 'px-2 py-0.5 text-xs',
    md: dot ? 'text-sm' : 'px-2.5 py-0.5 text-xs',
    lg: dot ? 'text-base' : 'px-3 py-1 text-sm',
  };

  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <span
      className={`
        ${baseClasses}
        ${variantClasses[variant] || variantClasses.default}
        ${sizeClasses[size] || sizeClasses.md}
        ${roundedClasses[rounded] || roundedClasses.full}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span 
          className={`
            mr-1.5 inline-block h-2 w-2 rounded-full 
            ${variant === 'default' ? 'bg-gray-400' : ''}
            ${variant === 'primary' ? 'bg-blue-500' : ''}
            ${variant === 'success' ? 'bg-green-500' : ''}
            ${variant === 'warning' ? 'bg-yellow-500' : ''}
            ${variant === 'danger' ? 'bg-red-500' : ''}
            ${variant === 'info' ? 'bg-cyan-500' : ''}
          `}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;