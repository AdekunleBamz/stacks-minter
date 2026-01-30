/**
 * Utility functions for Stacks blockchain interactions
 */

/**
 * Convert microSTX to STX
 * @param {number|string|bigint} microStx - Amount in microSTX
 * @returns {number} Amount in STX
 */
export function microStxToStx(microStx) {
  return Number(microStx) / 1_000_000;
}

/**
 * Convert STX to microSTX
 * @param {number} stx - Amount in STX
 * @returns {bigint} Amount in microSTX
 */
export function stxToMicroStx(stx) {
  return BigInt(Math.round(stx * 1_000_000));
}

/**
 * Format STX amount with proper decimal places
 * @param {number} amount - Amount in STX
 * @param {number} decimals - Number of decimal places (default: 6)
 * @returns {string} Formatted STX amount
 */
export function formatStx(amount, decimals = 6) {
  if (amount === null || amount === undefined) return '0';
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/**
 * Truncate Stacks address for display
 * @param {string} address - Full Stacks address
 * @param {number} startChars - Characters to show at start (default: 6)
 * @param {number} endChars - Characters to show at end (default: 4)
 * @returns {string} Truncated address
 */
export function truncateAddress(address, startChars = 6, endChars = 4) {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Truncate transaction ID for display
 * @param {string} txId - Full transaction ID
 * @returns {string} Truncated transaction ID
 */
export function truncateTxId(txId) {
  if (!txId) return '';
  return `${txId.slice(0, 8)}...${txId.slice(-8)}`;
}

/**
 * Get explorer URL for a transaction
 * @param {string} txId - Transaction ID
 * @param {string} network - Network (mainnet/testnet)
 * @returns {string} Explorer URL
 */
export function getExplorerTxUrl(txId, network = 'mainnet') {
  const baseUrl = 'https://explorer.hiro.so';
  const chainParam = network === 'testnet' ? '?chain=testnet' : '';
  return `${baseUrl}/txid/${txId}${chainParam}`;
}

/**
 * Get explorer URL for an address
 * @param {string} address - Stacks address
 * @param {string} network - Network (mainnet/testnet)
 * @returns {string} Explorer URL
 */
export function getExplorerAddressUrl(address, network = 'mainnet') {
  const baseUrl = 'https://explorer.hiro.so';
  const chainParam = network === 'testnet' ? '?chain=testnet' : '';
  return `${baseUrl}/address/${address}${chainParam}`;
}

/**
 * Validate Stacks address format
 * @param {string} address - Address to validate
 * @returns {boolean} True if valid format
 */
export function isValidStacksAddress(address) {
  if (!address || typeof address !== 'string') return false;
  // Basic validation: starts with SP or ST and has valid length
  const mainnetPattern = /^SP[0-9A-Z]{33,}$/;
  const testnetPattern = /^ST[0-9A-Z]{33,}$/;
  return mainnetPattern.test(address) || testnetPattern.test(address);
}

/**
 * Parse contract identifier into address and name
 * @param {string} contractId - Full contract ID (address.name)
 * @returns {Object} { address, name }
 */
export function parseContractId(contractId) {
  if (!contractId || !contractId.includes('.')) {
    return { address: '', name: '' };
  }
  const [address, name] = contractId.split('.');
  return { address, name };
}

/**
 * Sleep utility for async delays
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} baseDelay - Base delay in ms
 * @returns {Promise<any>} Result of function
 */
export async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await sleep(delay);
      }
    }
  }
  
  throw lastError;
}
