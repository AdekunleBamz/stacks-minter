import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { AppConfig, UserSession, showConnect, openContractCall } from '@stacks/connect'
import { 
  AnchorMode, 
  PostConditionMode, 
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  uintCV
} from '@stacks/transactions'
import { StacksMainnet, StacksTestnet } from '@stacks/network'

const StacksContext = createContext()

// App configuration
const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig })

// Network configuration
const NETWORK = import.meta.env.VITE_NETWORK === 'testnet' 
  ? new StacksTestnet() 
  : new StacksMainnet()

const API_URL = import.meta.env.VITE_STACKS_API_URL || 'https://api.mainnet.hiro.so'

export const useStacks = () => {
  const context = useContext(StacksContext)
  if (!context) {
    throw new Error('useStacks must be used within a StacksProvider')
  }
  return context
}

export const StacksProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [userData, setUserData] = useState(null)
  const [balance, setBalance] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Check if user is already signed in
  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const data = userSession.loadUserData()
      setUserData({
        ...data,
        address: data.profile?.stxAddress?.mainnet || data.profile?.stxAddress?.testnet
      })
      setIsConnected(true)
    }
  }, [])

  // Fetch balance when connected
  useEffect(() => {
    if (userData?.address) {
      fetchBalance(userData.address)
    }
  }, [userData?.address])

  const fetchBalance = async (address) => {
    try {
      const response = await fetch(`${API_URL}/extended/v1/address/${address}/stx`)
      const data = await response.json()
      setBalance({
        stx: parseInt(data.balance) / 1_000_000,
        locked: parseInt(data.locked) / 1_000_000
      })
    } catch (err) {
      console.error('Error fetching balance:', err)
    }
  }

  const connectWallet = useCallback(() => {
    setIsLoading(true)
    setError(null)

    showConnect({
      appDetails: {
        name: 'Stacks NFT Minter',
        icon: window.location.origin + '/favicon.ico'
      },
      redirectTo: '/',
      onFinish: () => {
        const data = userSession.loadUserData()
        setUserData({
          ...data,
          address: data.profile?.stxAddress?.mainnet || data.profile?.stxAddress?.testnet
        })
        setIsConnected(true)
        setIsLoading(false)
      },
      onCancel: () => {
        setIsLoading(false)
      },
      userSession
    })
  }, [])

  const disconnectWallet = useCallback(() => {
    userSession.signUserOut()
    setIsConnected(false)
    setUserData(null)
    setBalance(null)
  }, [])

  const mintNFT = useCallback(async (contractAddress, contractName, amount = 1) => {
    if (!userData?.address) {
      throw new Error('Wallet not connected')
    }

    setIsLoading(true)
    setError(null)

    try {
      const mintPrice = 100000 // 0.1 STX in microSTX
      const totalCost = mintPrice * amount

      // Create post condition to limit STX spend
      const postCondition = makeStandardSTXPostCondition(
        userData.address,
        FungibleConditionCode.Equal,
        totalCost
      )

      const txOptions = {
        network: NETWORK,
        contractAddress,
        contractName,
        functionName: amount > 1 ? 'mint-batch' : 'mint',
        functionArgs: amount > 1 ? [uintCV(amount)] : [],
        postConditionMode: PostConditionMode.Deny,
        postConditions: [postCondition],
        anchorMode: AnchorMode.Any,
        fee: 4000, // 0.004 STX - low fee
        appDetails: {
          name: 'Stacks NFT Minter',
          icon: window.location.origin + '/favicon.ico'
        },
        onFinish: (data) => {
          console.log('Transaction submitted:', data)
          setIsLoading(false)
          // Refresh balance after mint
          setTimeout(() => fetchBalance(userData.address), 5000)
          return data
        },
        onCancel: () => {
          setIsLoading(false)
        }
      }

      await openContractCall(txOptions)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
      throw err
    }
  }, [userData])

  const value = {
    isConnected,
    userData,
    balance,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    mintNFT,
    userSession,
    network: NETWORK
  }

  return (
    <StacksContext.Provider value={value}>
      {children}
    </StacksContext.Provider>
  )
}

export default StacksContext
