import React, { useState, useRef, useEffect } from 'react';

/**
 * Network switcher dropdown component
 * Allows users to switch between mainnet and testnet
 */
export default function NetworkSwitcher({ 
  currentNetwork = 'mainnet', 
  onNetworkChange,
  disabled = false 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const networks = [
    { 
      id: 'mainnet', 
      name: 'Mainnet', 
      description: 'Production network',
      color: 'bg-green-500'
    },
    { 
      id: 'testnet', 
      name: 'Testnet', 
      description: 'Testing network',
      color: 'bg-yellow-500'
    },
  ];

  const currentNet = networks.find(n => n.id === currentNetwork) || networks[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (networkId) => {
    if (networkId !== currentNetwork && onNetworkChange) {
      onNetworkChange(networkId);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg
          bg-gray-100 dark:bg-gray-800
          hover:bg-gray-200 dark:hover:bg-gray-700
          transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={`w-2 h-2 rounded-full ${currentNet.color}`} />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentNet.name}
        </span>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
          role="listbox"
        >
          {networks.map((network) => (
            <button
              key={network.id}
              onClick={() => handleSelect(network.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-2 text-left
                hover:bg-gray-100 dark:hover:bg-gray-700
                transition-colors
                ${network.id === currentNetwork ? 'bg-gray-50 dark:bg-gray-750' : ''}
              `}
              role="option"
              aria-selected={network.id === currentNetwork}
            >
              <span className={`w-2 h-2 rounded-full ${network.color}`} />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {network.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {network.description}
                </p>
              </div>
              {network.id === currentNetwork && (
                <svg className="w-4 h-4 ml-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Network indicator badge
 */
export function NetworkBadge({ network = 'mainnet' }) {
  const isMainnet = network === 'mainnet';
  
  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium
      ${isMainnet 
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      }
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${isMainnet ? 'bg-green-500' : 'bg-yellow-500'}`} />
      {isMainnet ? 'Mainnet' : 'Testnet'}
    </span>
  );
}
