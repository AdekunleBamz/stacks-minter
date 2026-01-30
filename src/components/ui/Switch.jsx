import React from 'react';

/**
 * Toggle/Switch component
 */
export default function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  description,
  className = '',
}) {
  const sizes = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7',
    },
  };

  const sizeStyle = sizes[size] || sizes.md;

  const handleChange = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleChange();
    }
  };

  return (
    <label 
      className={`
        flex items-start gap-3 
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        ${className}
      `}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleChange}
        onKeyDown={handleKeyDown}
        className={`
          relative inline-flex flex-shrink-0 rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
          ${sizeStyle.track}
          ${checked 
            ? 'bg-purple-600' 
            : 'bg-gray-200 dark:bg-gray-700'
          }
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block rounded-full
            bg-white shadow-lg transform ring-0
            transition duration-200 ease-in-out
            ${sizeStyle.thumb}
            ${checked ? sizeStyle.translate : 'translate-x-0.5'}
            ${size === 'sm' ? 'mt-0.5 ml-0.5' : 'mt-0.5'}
          `}
        />
      </button>
      
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {label}
            </span>
          )}
          {description && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}

/**
 * Theme toggle switch
 */
export function ThemeSwitch({ isDark, onToggle }) {
  return (
    <Switch
      checked={isDark}
      onChange={onToggle}
      label={isDark ? 'Dark Mode' : 'Light Mode'}
    />
  );
}

/**
 * Testnet/Mainnet toggle
 */
export function NetworkSwitch({ isMainnet, onToggle }) {
  return (
    <Switch
      checked={isMainnet}
      onChange={onToggle}
      label={isMainnet ? 'Mainnet' : 'Testnet'}
      description={isMainnet ? 'Using production network' : 'Using test network'}
    />
  );
}
