import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to fetch and cache STX balance for an address
 * @param {string} address - Stacks address to check balance for
 * @param {string} network - Network to use (mainnet/testnet)
 * @returns {Object} - { balance, loading, error, refetch }
 */
export function useSTXBalance(address, network = 'mainnet') {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = network === 'mainnet' 
    ? 'https://api.mainnet.hiro.so'
    : 'https://api.testnet.hiro.so';

  const fetchBalance = useCallback(async () => {
    if (!address) {
      setBalance(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/extended/v1/address/${address}/stx`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch balance: ${response.status}`);
      }

      const data = await response.json();
      // Convert microSTX to STX
      setBalance(Number(data.balance) / 1_000_000);
    } catch (err) {
      setError(err.message);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }, [address, apiUrl]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, loading, error, refetch: fetchBalance };
}

/**
 * Custom hook to fetch NFT holdings for an address
 * @param {string} address - Stacks address to check
 * @param {string} contractId - Optional contract ID to filter by
 * @returns {Object} - { nfts, loading, error, refetch }
 */
export function useNFTHoldings(address, contractId = null) {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNFTs = useCallback(async () => {
    if (!address) {
      setNfts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let url = `https://api.mainnet.hiro.so/extended/v1/tokens/nft/holdings?principal=${address}&limit=50`;
      
      if (contractId) {
        url += `&asset_identifiers=${contractId}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch NFTs: ${response.status}`);
      }

      const data = await response.json();
      setNfts(data.results || []);
    } catch (err) {
      setError(err.message);
      setNfts([]);
    } finally {
      setLoading(false);
    }
  }, [address, contractId]);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  return { nfts, loading, error, refetch: fetchNFTs };
}

/**
 * Custom hook to track transaction status
 * @param {string} txId - Transaction ID to track
 * @returns {Object} - { status, loading, error }
 */
export function useTransactionStatus(txId) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!txId) {
      setStatus(null);
      return;
    }

    let isMounted = true;
    let intervalId;

    const checkStatus = async () => {
      setLoading(true);
      
      try {
        const response = await fetch(
          `https://api.mainnet.hiro.so/extended/v1/tx/${txId}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch tx: ${response.status}`);
        }

        const data = await response.json();
        
        if (isMounted) {
          setStatus(data.tx_status);
          
          // Stop polling if transaction is confirmed or failed
          if (data.tx_status === 'success' || data.tx_status === 'abort_by_response') {
            clearInterval(intervalId);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkStatus();
    intervalId = setInterval(checkStatus, 10000); // Poll every 10 seconds

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [txId]);

  return { status, loading, error };
}
