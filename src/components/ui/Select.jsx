import React, { useState, useRef, useEffect } from 'react';

/**
 * Custom Select dropdown component
 */
export default function Select({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  label,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen) {
          onChange?.(options[highlightedIndex]?.value);
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex(i => (i + 1) % options.length);
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex(i => (i - 1 + options.length) % options.length);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (optionValue) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`
            w-full px-4 py-2 text-left rounded-lg border transition-colors
            flex items-center justify-between
            ${disabled 
              ? 'bg-gray-100 cursor-not-allowed text-gray-400 dark:bg-gray-800' 
              : 'bg-white dark:bg-gray-900 cursor-pointer hover:border-gray-400'
            }
            ${error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500'
            }
            focus:outline-none focus:ring-2
          `}
        >
          <span className={selectedOption ? 'text-gray-900 dark:text-white' : 'text-gray-500'}>
            {selectedOption?.label || placeholder}
          </span>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <ul
            role="listbox"
            className={`
              absolute z-50 w-full mt-1 py-1 rounded-lg shadow-lg
              bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
              max-h-60 overflow-auto
            `}
          >
            {options.length === 0 ? (
              <li className="px-4 py-2 text-gray-500 text-sm">No options</li>
            ) : (
              options.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`
                    px-4 py-2 cursor-pointer text-sm
                    ${index === highlightedIndex ? 'bg-purple-50 dark:bg-purple-900/30' : ''}
                    ${option.value === value 
                      ? 'text-purple-600 dark:text-purple-400 font-medium' 
                      : 'text-gray-900 dark:text-gray-100'
                    }
                    hover:bg-purple-50 dark:hover:bg-purple-900/30
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {option.value === value && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

/**
 * Network selector using Select component
 */
export function NetworkSelect({ value, onChange }) {
  const networks = [
    { value: 'mainnet', label: 'Mainnet' },
    { value: 'testnet', label: 'Testnet' },
  ];

  return (
    <Select
      options={networks}
      value={value}
      onChange={onChange}
      label="Network"
    />
  );
}
