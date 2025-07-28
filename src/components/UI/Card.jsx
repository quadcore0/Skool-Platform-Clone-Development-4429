import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  actions,
  className = '', 
  padding = true,
  noBorder = false,
  contentClassName = ''
}) => {
  return (
    <div className={`
      bg-white dark:bg-gray-800 
      rounded-lg shadow-sm 
      ${!noBorder ? 'border border-gray-200 dark:border-gray-700' : ''}
      overflow-hidden
      ${className}
    `}>
      {(title || actions) && (
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div>
            {title && (
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className={`${padding && !contentClassName.includes('p-') ? 'p-6' : ''} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;