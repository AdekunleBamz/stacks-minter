import React from 'react';

/**
 * Format transaction status with color
 */
function getStatusBadge(status) {
  const styles = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    abort_by_response: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    abort_by_post_condition: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const labels = {
    success: 'Confirmed',
    pending: 'Pending',
    abort_by_response: 'Failed',
    abort_by_post_condition: 'Failed',
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  );
}

/**
 * Format timestamp to relative time
 */
function formatRelativeTime(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

/**
 * Transaction row component
 */
function TransactionRow({ tx, onClick }) {
  const txId = tx.tx_id || tx.txid;
  const truncatedId = `${txId.slice(0, 8)}...${txId.slice(-8)}`;
  
  return (
    <div 
      className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
      onClick={() => onClick?.(txId)}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
          <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white font-mono">
            {truncatedId}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {tx.tx_type || 'contract_call'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {tx.burn_block_time && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatRelativeTime(tx.burn_block_time)}
          </span>
        )}
        {getStatusBadge(tx.tx_status)}
      </div>
    </div>
  );
}

/**
 * Transaction history list component
 * @param {Object} props
 * @param {Array} props.transactions - Array of transaction objects
 * @param {boolean} props.loading - Loading state
 * @param {Function} props.onTransactionClick - Click handler
 */
export default function TransactionHistory({ 
  transactions = [], 
  loading = false,
  onTransactionClick,
  emptyMessage = 'No transactions yet'
}) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-4 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
      </div>
      
      {transactions.length === 0 ? (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((tx) => (
            <TransactionRow 
              key={tx.tx_id || tx.txid} 
              tx={tx} 
              onClick={onTransactionClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
