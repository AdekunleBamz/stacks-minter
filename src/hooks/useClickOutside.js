import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook to detect clicks outside an element
 * @param {Function} callback - Function to call when clicking outside
 * @param {boolean} enabled - Whether the hook is active
 * @returns {React.RefObject} Ref to attach to the element
 */
export function useClickOutside(callback, enabled = true) {
  const ref = useRef(null);
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackRef.current(event);
      }
    };

    // Use mousedown for immediate response
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [enabled]);

  return ref;
}

/**
 * Hook to detect clicks outside multiple elements
 * @param {Function} callback - Function to call when clicking outside
 * @param {boolean} enabled - Whether the hook is active
 * @returns {Array} Array of refs to attach to elements
 */
export function useClickOutsideMultiple(callback, count = 2, enabled = true) {
  const refs = useRef(Array.from({ length: count }, () => ({ current: null })));
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event) => {
      const isOutside = refs.current.every(
        (ref) => ref.current && !ref.current.contains(event.target)
      );
      
      if (isOutside) {
        callbackRef.current(event);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [enabled]);

  return refs.current;
}

/**
 * Hook to handle escape key press
 * @param {Function} callback - Function to call on escape
 * @param {boolean} enabled - Whether the hook is active
 */
export function useEscapeKey(callback, enabled = true) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        callbackRef.current(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);
}

/**
 * Combined hook for dropdown/modal dismiss behavior
 * @param {Function} onDismiss - Function to call on dismiss
 * @param {boolean} enabled - Whether the hooks are active
 * @returns {React.RefObject} Ref to attach to the element
 */
export function useDismiss(onDismiss, enabled = true) {
  const ref = useClickOutside(onDismiss, enabled);
  useEscapeKey(onDismiss, enabled);
  return ref;
}

export default useClickOutside;
