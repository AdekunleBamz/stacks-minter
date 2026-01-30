/**
 * Validation utilities for Stacks NFT minter
 */

/**
 * Validate Stacks address format
 * @param {string} address - Address to validate
 * @returns {boolean} Whether address is valid
 */
export function isValidStacksAddress(address) {
  if (!address || typeof address !== 'string') return false;
  
  // Mainnet addresses start with SP, testnet with ST
  const regex = /^S[PT][A-Z0-9]{38,39}$/;
  return regex.test(address);
}

/**
 * Validate mainnet Stacks address
 * @param {string} address - Address to validate
 * @returns {boolean} Whether address is valid mainnet address
 */
export function isMainnetAddress(address) {
  if (!address) return false;
  return address.startsWith('SP') && isValidStacksAddress(address);
}

/**
 * Validate testnet Stacks address
 * @param {string} address - Address to validate
 * @returns {boolean} Whether address is valid testnet address
 */
export function isTestnetAddress(address) {
  if (!address) return false;
  return address.startsWith('ST') && isValidStacksAddress(address);
}

/**
 * Validate transaction ID format
 * @param {string} txId - Transaction ID to validate
 * @returns {boolean} Whether txId is valid
 */
export function isValidTxId(txId) {
  if (!txId || typeof txId !== 'string') return false;
  // Transaction IDs are 64 hex characters, optionally prefixed with 0x
  const cleanId = txId.startsWith('0x') ? txId.slice(2) : txId;
  return /^[a-fA-F0-9]{64}$/.test(cleanId);
}

/**
 * Validate contract identifier
 * @param {string} contractId - Contract identifier (address.contract-name)
 * @returns {boolean} Whether contract ID is valid
 */
export function isValidContractId(contractId) {
  if (!contractId || typeof contractId !== 'string') return false;
  
  const parts = contractId.split('.');
  if (parts.length !== 2) return false;
  
  const [address, name] = parts;
  return isValidStacksAddress(address) && isValidContractName(name);
}

/**
 * Validate contract name
 * @param {string} name - Contract name
 * @returns {boolean} Whether name is valid
 */
export function isValidContractName(name) {
  if (!name || typeof name !== 'string') return false;
  // Contract names: lowercase, numbers, hyphens, 1-40 chars, can't start with number
  return /^[a-z][a-z0-9-]{0,39}$/.test(name);
}

/**
 * Validate STX amount
 * @param {string|number} amount - Amount to validate
 * @param {number} minAmount - Minimum amount (in STX)
 * @param {number} maxAmount - Maximum amount (in STX)
 * @returns {Object} Validation result
 */
export function validateStxAmount(amount, minAmount = 0, maxAmount = Infinity) {
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount)) {
    return { valid: false, error: 'Invalid amount' };
  }
  
  if (numAmount < minAmount) {
    return { valid: false, error: `Minimum amount is ${minAmount} STX` };
  }
  
  if (numAmount > maxAmount) {
    return { valid: false, error: `Maximum amount is ${maxAmount} STX` };
  }
  
  if (numAmount < 0) {
    return { valid: false, error: 'Amount cannot be negative' };
  }
  
  return { valid: true, error: null };
}

/**
 * Validate NFT metadata URL
 * @param {string} url - URL to validate
 * @returns {Object} Validation result
 */
export function validateMetadataUrl(url) {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'URL is required' };
  }
  
  try {
    const parsed = new URL(url);
    
    // Check for supported protocols
    if (!['http:', 'https:', 'ipfs:'].includes(parsed.protocol)) {
      return { valid: false, error: 'URL must use http, https, or ipfs protocol' };
    }
    
    return { valid: true, error: null };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

/**
 * Validate image file
 * @param {File} file - File to validate
 * @param {number} maxSizeMb - Maximum file size in MB
 * @returns {Object} Validation result
 */
export function validateImageFile(file, maxSizeMb = 10) {
  if (!file) {
    return { valid: false, error: 'File is required' };
  }
  
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File must be JPEG, PNG, GIF, WebP, or SVG' };
  }
  
  const maxBytes = maxSizeMb * 1024 * 1024;
  if (file.size > maxBytes) {
    return { valid: false, error: `File must be smaller than ${maxSizeMb}MB` };
  }
  
  return { valid: true, error: null };
}

/**
 * Check if user has sufficient balance
 * @param {number} balance - User balance in microSTX
 * @param {number} required - Required amount in microSTX
 * @returns {boolean} Whether balance is sufficient
 */
export function hasSufficientBalance(balance, required) {
  return Number(balance) >= Number(required);
}
