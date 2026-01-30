import React from 'react';

/**
 * Reusable loading spinner component
 * @param {Object} props - Component props
 * @param {string} props.size - Size variant: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} props.color - Tailwind color class (default: 'border-indigo-500')
 * @param {string} props.text - Optional loading text
 * @param {boolean} props.fullScreen - Whether to center in full screen
 */
export default function LoadingSpinner({ 
  size = 'md', 
  color = 'border-indigo-500',
  text = '',
  fullScreen = false 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  };

  const spinnerClass = `
    ${sizeClasses[size] || sizeClasses.md}
    ${color}
    border-t-transparent
    rounded-full
    animate-spin
  `.trim();

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={spinnerClass} role="status" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

/**
 * Skeleton loader for content placeholders
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 */
export function Skeleton({ className = '' }) {
  return (
    <div 
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Card skeleton for NFT card loading state
 */
export function NFTCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <Skeleton className="w-full aspect-square" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-8 w-full mt-4" />
      </div>
    </div>
  );
}
