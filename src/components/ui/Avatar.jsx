import React from 'react';

/**
 * Generate a deterministic color from a string (address)
 */
function stringToColor(str) {
  if (!str) return '#6366f1'; // Default indigo
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e',
    '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e',
  ];
  
  return colors[Math.abs(hash) % colors.length];
}

/**
 * Get initials from address
 */
function getInitials(address) {
  if (!address) return '?';
  // Return first 2 chars after SP/ST
  return address.slice(2, 4).toUpperCase();
}

/**
 * Avatar component for displaying wallet addresses
 * @param {Object} props
 * @param {string} props.address - Stacks address
 * @param {string} props.src - Optional image source
 * @param {string} props.size - Size variant: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {string} props.alt - Alt text for image
 * @param {boolean} props.showIndicator - Show online indicator
 */
export default function Avatar({
  address,
  src,
  size = 'md',
  alt,
  showIndicator = false,
  indicatorColor = 'bg-green-500',
  className = '',
}) {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const indicatorSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  const backgroundColor = stringToColor(address);

  return (
    <div className={`relative inline-flex ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt || address}
          className={`${sizes[size]} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`
            ${sizes[size]}
            rounded-full flex items-center justify-center
            text-white font-medium
          `}
          style={{ backgroundColor }}
          aria-label={address || 'User avatar'}
        >
          {getInitials(address)}
        </div>
      )}
      
      {showIndicator && (
        <span
          className={`
            absolute bottom-0 right-0
            ${indicatorSizes[size]}
            ${indicatorColor}
            rounded-full border-2 border-white dark:border-gray-900
          `}
        />
      )}
    </div>
  );
}

/**
 * Avatar group for showing multiple avatars
 */
export function AvatarGroup({ 
  addresses = [], 
  max = 4, 
  size = 'md',
  className = '' 
}) {
  const visibleAddresses = addresses.slice(0, max);
  const remaining = addresses.length - max;

  const overlapClass = {
    xs: '-ml-2',
    sm: '-ml-2.5',
    md: '-ml-3',
    lg: '-ml-4',
    xl: '-ml-5',
  };

  return (
    <div className={`flex ${className}`}>
      {visibleAddresses.map((address, index) => (
        <div
          key={address}
          className={index > 0 ? overlapClass[size] : ''}
          style={{ zIndex: visibleAddresses.length - index }}
        >
          <Avatar address={address} size={size} />
        </div>
      ))}
      
      {remaining > 0 && (
        <div className={overlapClass[size]} style={{ zIndex: 0 }}>
          <div className={`
            ${sizes[size]} rounded-full
            bg-gray-200 dark:bg-gray-700
            flex items-center justify-center
            text-gray-600 dark:text-gray-300 font-medium
          `}>
            +{remaining}
          </div>
        </div>
      )}
    </div>
  );
}

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};
