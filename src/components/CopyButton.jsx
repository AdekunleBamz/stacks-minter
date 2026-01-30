import React, { useState, useCallback } from 'react';

/**
 * Custom hook for clipboard operations
 * @returns {Object} { copy, copied, error }
 */
export function useClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const copy = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      setError('Clipboard API not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);

      setTimeout(() => {
        setCopied(false);
      }, resetDelay);

      return true;
    } catch (err) {
      setError(err.message);
      setCopied(false);
      return false;
    }
  }, [resetDelay]);

  return { copy, copied, error };
}

/**
 * Copy button component
 * @param {Object} props
 * @param {string} props.text - Text to copy
 * @param {string} props.label - Button label
 * @param {string} props.className - Additional CSS classes
 */
export function CopyButton({ text, label = 'Copy', className = '' }) {
  const { copy, copied } = useClipboard();

  return (
    <button
      onClick={() => copy(text)}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5
        text-sm font-medium rounded-lg
        transition-all duration-200
        ${copied 
          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        }
        ${className}
      `}
      aria-label={copied ? 'Copied!' : label}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

/**
 * Copyable text component - click to copy
 * @param {Object} props
 * @param {string} props.text - Text to display and copy
 * @param {boolean} props.truncate - Whether to truncate long text
 */
export function CopyableText({ text, truncate = false, className = '' }) {
  const { copy, copied } = useClipboard();

  const displayText = truncate && text.length > 20 
    ? `${text.slice(0, 8)}...${text.slice(-8)}`
    : text;

  return (
    <button
      onClick={() => copy(text)}
      className={`
        inline-flex items-center gap-2 font-mono text-sm
        hover:text-indigo-600 dark:hover:text-indigo-400
        transition-colors cursor-pointer
        ${className}
      `}
      title={copied ? 'Copied!' : 'Click to copy'}
    >
      <span>{displayText}</span>
      {copied ? (
        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

export default CopyButton;
