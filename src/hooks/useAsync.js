import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Hook for managing async operations with loading/error states
 * @param {Function} asyncFunction - The async function to execute
 * @param {boolean} immediate - Whether to execute immediately
 * @returns {Object} State and execute function
 */
export function useAsync(asyncFunction, immediate = false) {
  const [state, setState] = useState({
    data: null,
    loading: immediate,
    error: null,
  });

  const mountedRef = useRef(true);

  const execute = useCallback(async (...args) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await asyncFunction(...args);
      if (mountedRef.current) {
        setState({ data: result, loading: false, error: null });
      }
      return result;
    } catch (error) {
      if (mountedRef.current) {
        setState({ data: null, loading: false, error });
      }
      throw error;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
    isIdle: !state.loading && !state.data && !state.error,
    isSuccess: !state.loading && state.data && !state.error,
    isError: !state.loading && state.error,
  };
}

/**
 * Hook for fetching data with automatic retry
 * @param {Function} fetchFunction - The fetch function
 * @param {Object} options - Options including retries and delay
 */
export function useAsyncRetry(fetchFunction, options = {}) {
  const { retries = 3, retryDelay = 1000 } = options;
  const [attempt, setAttempt] = useState(0);

  const wrappedFunction = useCallback(async (...args) => {
    let lastError;
    
    for (let i = 0; i <= retries; i++) {
      try {
        setAttempt(i + 1);
        return await fetchFunction(...args);
      } catch (error) {
        lastError = error;
        if (i < retries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * (i + 1)));
        }
      }
    }
    
    throw lastError;
  }, [fetchFunction, retries, retryDelay]);

  const async = useAsync(wrappedFunction, false);

  return {
    ...async,
    attempt,
    maxAttempts: retries + 1,
  };
}

/**
 * Hook for polling data at intervals
 * @param {Function} fetchFunction - The fetch function
 * @param {number} interval - Polling interval in ms
 * @param {boolean} enabled - Whether polling is enabled
 */
export function usePolling(fetchFunction, interval = 5000, enabled = true) {
  const async = useAsync(fetchFunction, false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    // Initial fetch
    async.execute();

    // Set up polling
    intervalRef.current = setInterval(() => {
      async.execute();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, interval]);

  return async;
}

/**
 * Hook for transaction status polling
 * @param {string} txId - Transaction ID to monitor
 * @param {number} interval - Polling interval
 */
export function useTransactionStatus(txId, interval = 3000) {
  const fetchStatus = useCallback(async () => {
    if (!txId) return null;
    
    const response = await fetch(
      `https://api.mainnet.hiro.so/extended/v1/tx/${txId}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch transaction');
    return response.json();
  }, [txId]);

  return usePolling(fetchStatus, interval, !!txId);
}

export default useAsync;
