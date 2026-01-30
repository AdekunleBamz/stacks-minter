import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

/**
 * Toast notification types
 */
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

/**
 * Individual Toast component
 */
function Toast({ id, type, message, onClose }) {
  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-gray-900',
    info: 'bg-blue-500 text-white',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
        transform transition-all duration-300 ease-out
        ${typeStyles[type] || typeStyles.info}
      `}
      role="alert"
    >
      <span className="text-lg font-bold">{icons[type]}</span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="p-1 hover:opacity-80 transition-opacity"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

/**
 * Toast container that renders all active toasts
 */
function ToastContainer({ toasts, removeToast }) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}

/**
 * Toast Provider component
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 5000) => {
    const id = Date.now() + Math.random();
    
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (message, duration) => addToast(message, TOAST_TYPES.SUCCESS, duration),
    error: (message, duration) => addToast(message, TOAST_TYPES.ERROR, duration),
    warning: (message, duration) => addToast(message, TOAST_TYPES.WARNING, duration),
    info: (message, duration) => addToast(message, TOAST_TYPES.INFO, duration),
    remove: removeToast,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

/**
 * Hook to use toast notifications
 * @returns {Object} Toast methods: success, error, warning, info, remove
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
