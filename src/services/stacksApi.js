/**
 * Stacks API Service
 * Centralized API calls to Hiro API
 */

const MAINNET_API = 'https://api.mainnet.hiro.so';
const TESTNET_API = 'https://api.testnet.hiro.so';

/**
 * Get API base URL for network
 * @param {string} network - 'mainnet' or 'testnet'
 * @returns {string} API URL
 */
function getApiUrl(network = 'mainnet') {
  return network === 'testnet' ? TESTNET_API : MAINNET_API;
}

/**
 * Fetch wrapper with error handling
 */
async function apiFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `API Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`API Error: ${url}`, error);
    throw error;
  }
}

/**
 * Account API methods
 */
export const accountApi = {
  /**
   * Get STX balance for an address
   */
  async getBalance(address, network = 'mainnet') {
    const url = `${getApiUrl(network)}/extended/v1/address/${address}/stx`;
    return apiFetch(url);
  },

  /**
   * Get account info including nonce
   */
  async getAccountInfo(address, network = 'mainnet') {
    const url = `${getApiUrl(network)}/v2/accounts/${address}`;
    return apiFetch(url);
  },

  /**
   * Get nonces for an address
   */
  async getNonces(address, network = 'mainnet') {
    const url = `${getApiUrl(network)}/extended/v1/address/${address}/nonces`;
    return apiFetch(url);
  },
};

/**
 * Transaction API methods
 */
export const transactionApi = {
  /**
   * Get transaction by ID
   */
  async getTransaction(txId, network = 'mainnet') {
    const url = `${getApiUrl(network)}/extended/v1/tx/${txId}`;
    return apiFetch(url);
  },

  /**
   * Get transactions for an address
   */
  async getAddressTransactions(address, network = 'mainnet', limit = 20) {
    const url = `${getApiUrl(network)}/extended/v1/address/${address}/transactions?limit=${limit}`;
    return apiFetch(url);
  },

  /**
   * Get pending transactions for an address
   */
  async getPendingTransactions(address, network = 'mainnet') {
    const url = `${getApiUrl(network)}/extended/v1/address/${address}/mempool`;
    return apiFetch(url);
  },

  /**
   * Broadcast a signed transaction
   */
  async broadcastTransaction(txHex, network = 'mainnet') {
    const url = `${getApiUrl(network)}/v2/transactions`;
    return apiFetch(url, {
      method: 'POST',
      body: JSON.stringify(txHex),
    });
  },
};

/**
 * NFT API methods
 */
export const nftApi = {
  /**
   * Get NFT holdings for an address
   */
  async getHoldings(address, network = 'mainnet', limit = 50) {
    const url = `${getApiUrl(network)}/extended/v1/tokens/nft/holdings?principal=${address}&limit=${limit}`;
    return apiFetch(url);
  },

  /**
   * Get NFT metadata
   */
  async getMetadata(contractId, tokenId, network = 'mainnet') {
    const url = `${getApiUrl(network)}/extended/v1/tokens/nft/metadata/${contractId}/${tokenId}`;
    return apiFetch(url);
  },

  /**
   * Get NFT mints for a contract
   */
  async getMints(contractId, network = 'mainnet', limit = 50) {
    const url = `${getApiUrl(network)}/extended/v1/tokens/nft/mints?asset_identifier=${contractId}&limit=${limit}`;
    return apiFetch(url);
  },
};

/**
 * Contract API methods
 */
export const contractApi = {
  /**
   * Get contract info
   */
  async getContractInfo(contractId, network = 'mainnet') {
    const url = `${getApiUrl(network)}/extended/v1/contract/${contractId}`;
    return apiFetch(url);
  },

  /**
   * Call read-only function
   */
  async callReadOnly(contractAddress, contractName, functionName, args = [], network = 'mainnet') {
    const url = `${getApiUrl(network)}/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`;
    return apiFetch(url, {
      method: 'POST',
      body: JSON.stringify({
        sender: contractAddress,
        arguments: args,
      }),
    });
  },
};

export default {
  account: accountApi,
  transaction: transactionApi,
  nft: nftApi,
  contract: contractApi,
};
