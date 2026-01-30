import React from 'react';

/**
 * Badge component for status indicators and labels
 * @param {Object} props
 * @param {string} props.variant - Color variant
 * @param {string} props.size - Size: 'sm', 'md', 'lg'
 * @param {boolean} props.dot - Show dot indicator
 * @param {boolean} props.pill - Pill shape (more rounded)
 * @param {React.ReactNode} props.children - Badge content
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  pill = false,
  className = '',
}) {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  };

  const dotColors = {
    default: 'bg-gray-500',
    primary: 'bg-indigo-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const roundedness = pill ? 'rounded-full' : 'rounded-md';

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium
        ${variants[variant] || variants.default}
        ${sizes[size] || sizes.md}
        ${roundedness}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
}

/**
 * Status badge with predefined states
 */
export function StatusBadge({ status, showDot = true }) {
  const statusConfig = {
    success: { label: 'Success', variant: 'success' },
    pending: { label: 'Pending', variant: 'warning' },
    failed: { label: 'Failed', variant: 'danger' },
    confirmed: { label: 'Confirmed', variant: 'success' },
    processing: { label: 'Processing', variant: 'info' },
  };

  const config = statusConfig[status] || { label: status, variant: 'default' };

  return (
    <Badge variant={config.variant} dot={showDot} pill>
      {config.label}
    </Badge>
  );
}

/**
 * Count badge (for notifications, etc.)
 */
export function CountBadge({ count, max = 99, variant = 'danger' }) {
  const displayCount = count > max ? `${max}+` : count;
  
  if (count <= 0) return null;

  return (
    <Badge variant={variant} size="sm" pill className="min-w-[1.5rem] justify-center">
      {displayCount}
    </Badge>
  );
}
