import React from 'react';
import { render } from '@testing-library/react';

/**
 * Custom render function with providers
 * Wraps component in all necessary context providers
 */
export function renderWithProviders(ui, options = {}) {
  const {
    initialState = {},
    ...renderOptions
  } = options;

  // Add your context providers here
  function Wrapper({ children }) {
    return (
      // <StacksProvider>
      //   <ToastProvider>
          <>{children}</>
      //   </ToastProvider>
      // </StacksProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

/**
 * Mock Stacks wallet connection
 */
export const mockWalletConnection = {
  connected: true,
  address: 'SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N',
  publicKey: 'mock-public-key',
};

/**
 * Mock disconnected wallet state
 */
export const mockDisconnectedWallet = {
  connected: false,
  address: null,
  publicKey: null,
};

/**
 * Mock NFT data for testing
 */
export const mockNFTs = [
  {
    token_id: 1,
    name: 'Test NFT #1',
    image_uri: 'https://example.com/nft1.png',
    description: 'A test NFT',
  },
  {
    token_id: 2,
    name: 'Test NFT #2',
    image_uri: 'https://example.com/nft2.png',
    description: 'Another test NFT',
  },
];

/**
 * Mock transaction data
 */
export const mockTransaction = {
  tx_id: '0x123abc456def789',
  tx_status: 'success',
  tx_type: 'contract_call',
  sender_address: 'SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N',
  fee_rate: 5000,
  burn_block_time: Math.floor(Date.now() / 1000) - 3600,
};

/**
 * Mock pending transaction
 */
export const mockPendingTransaction = {
  ...mockTransaction,
  tx_status: 'pending',
};

/**
 * Create mock fetch response
 */
export function createMockFetchResponse(data, status = 200) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  });
}

/**
 * Mock API responses
 */
export const mockApiResponses = {
  balance: {
    balance: '1000000', // 1 STX
    total_sent: '500000',
    total_received: '1500000',
  },
  nonces: {
    last_executed_tx_nonce: 5,
    possible_next_nonce: 6,
  },
};

/**
 * Wait for async operations in tests
 */
export function waitFor(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Re-export testing library utilities
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
