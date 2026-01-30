import React from 'react';

/**
 * Progress bar component
 */
export default function Progress({
  value = 0,
  max = 100,
  size = 'md',
  color = 'indigo',
  showLabel = false,
  animated = false,
  className = '',
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  };

  const colors = {
    indigo: 'bg-indigo-600',
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-500',
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`
            ${sizes[size]} ${colors[color]} rounded-full
            transition-all duration-300 ease-out
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}

/**
 * Mint progress component specific to NFT minting
 */
export function MintProgress({ minted, total, className = '' }) {
  const percentage = (minted / total) * 100;
  
  return (
    <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg p-4 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-900 dark:text-white">
          Minted
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {minted.toLocaleString()} / {total.toLocaleString()}
        </span>
      </div>
      
      <Progress value={minted} max={total} color="indigo" size="lg" />
      
      <div className="mt-2 text-center">
        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          {percentage.toFixed(1)}%
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
          Complete
        </span>
      </div>
    </div>
  );
}

/**
 * Circular progress indicator
 */
export function CircularProgress({ 
  value = 0, 
  size = 'md',
  strokeWidth = 4,
  color = 'indigo',
}) {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80,
  };

  const diameter = sizes[size] || sizes.md;
  const radius = (diameter - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const colors = {
    indigo: 'text-indigo-600',
    green: 'text-green-600',
    blue: 'text-blue-600',
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={diameter} height={diameter} className="-rotate-90">
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={diameter / 2}
          cy={diameter / 2}
        />
        <circle
          className={`${colors[color]} transition-all duration-300`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={diameter / 2}
          cy={diameter / 2}
        />
      </svg>
      <span className="absolute text-sm font-medium text-gray-900 dark:text-white">
        {Math.round(value)}%
      </span>
    </div>
  );
}
