import React, { useState, createContext, useContext } from 'react';

const TabsContext = createContext(null);

/**
 * Tabs container component
 */
export function Tabs({ 
  defaultValue, 
  value, 
  onChange, 
  children, 
  className = '' 
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;
  
  const handleChange = (newValue) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, onChange: handleChange }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/**
 * Tab list container
 */
export function TabList({ children, className = '' }) {
  return (
    <div 
      className={`
        flex border-b border-gray-200 dark:border-gray-700
        ${className}
      `}
      role="tablist"
    >
      {children}
    </div>
  );
}

/**
 * Individual tab trigger
 */
export function Tab({ value, children, disabled = false, className = '' }) {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('Tab must be used within Tabs');
  }
  
  const isActive = context.value === value;
  
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && context.onChange(value)}
      className={`
        px-4 py-2 text-sm font-medium transition-colors
        border-b-2 -mb-px
        ${isActive 
          ? 'border-purple-500 text-purple-600 dark:text-purple-400' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

/**
 * Tab panel content
 */
export function TabPanel({ value, children, className = '' }) {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabPanel must be used within Tabs');
  }
  
  if (context.value !== value) {
    return null;
  }
  
  return (
    <div 
      role="tabpanel"
      tabIndex={0}
      className={`py-4 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Vertical tabs variant
 */
export function VerticalTabs({ 
  defaultValue, 
  value, 
  onChange, 
  children, 
  className = '' 
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;
  
  const handleChange = (newValue) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, onChange: handleChange }}>
      <div className={`flex ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/**
 * Vertical tab list
 */
export function VerticalTabList({ children, className = '' }) {
  return (
    <div 
      className={`
        flex flex-col border-r border-gray-200 dark:border-gray-700 pr-4
        ${className}
      `}
      role="tablist"
      aria-orientation="vertical"
    >
      {children}
    </div>
  );
}

/**
 * Vertical tab trigger
 */
export function VerticalTab({ value, children, disabled = false, className = '' }) {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('VerticalTab must be used within VerticalTabs');
  }
  
  const isActive = context.value === value;
  
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && context.onChange(value)}
      className={`
        px-4 py-2 text-sm font-medium transition-colors text-left
        border-l-2 -ml-px
        ${isActive 
          ? 'border-purple-500 text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Tabs;
