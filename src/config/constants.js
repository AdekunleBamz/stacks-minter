/**
 * Application-wide constants and configuration
 * Centralized configuration for easier maintenance
 */

// Network configurations
export const NETWORKS = {
  mainnet: {
    name: 'Mainnet',
    apiUrl: 'https://api.mainnet.hiro.so',
    explorerUrl: 'https://explorer.hiro.so',
    chainId: 1,
  },
  testnet: {
    name: 'Testnet',
    apiUrl: 'https://api.testnet.hiro.so',
    explorerUrl: 'https://explorer.hiro.so/?chain=testnet',
    chainId: 2147483648,
  },
};

// Default network from environment or fallback
export const DEFAULT_NETWORK = import.meta.env.VITE_STACKS_NETWORK || 'mainnet';

// Contract configuration
export const CONTRACT = {
  address: import.meta.env.VITE_CONTRACT_ADDRESS || '',
  name: import.meta.env.VITE_CONTRACT_NAME || 'stacks-nft-v2',
  get fullId() {
    return `${this.address}.${this.name}`;
  },
};

// NFT Configuration
export const NFT_CONFIG = {
  maxSupply: 10000,
  mintPrice: 100000, // 0.1 STX in microSTX
  maxPerWallet: 10,
  reservedForTeam: 100,
};

// Transaction settings
export const TX_CONFIG = {
  defaultFee: 5000, // 0.005 STX in microSTX
  minFee: 3000,
  maxFee: 50000,
  anchorMode: 'any', // 'onChainOnly', 'offChainOnly', 'any'
};

// UI Configuration
export const UI_CONFIG = {
  toastDuration: 5000,
  pollInterval: 10000, // 10 seconds for tx status polling
  maxRetries: 3,
};

// App metadata for wallet connection
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Stacks NFT Minter',
  icon: import.meta.env.VITE_APP_ICON_URL || '/logo.svg',
};

// Error messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet first',
  INSUFFICIENT_BALANCE: 'Insufficient STX balance for this transaction',
  MINT_FAILED: 'Failed to mint NFT. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  CONTRACT_ERROR: 'Contract interaction failed',
  MAX_SUPPLY_REACHED: 'Maximum supply has been reached',
  MAX_PER_WALLET: 'You have reached the maximum NFTs per wallet',
};

// Success messages
export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: 'Wallet connected successfully!',
  MINT_SUBMITTED: 'Mint transaction submitted!',
  MINT_CONFIRMED: 'NFT minted successfully!',
};
