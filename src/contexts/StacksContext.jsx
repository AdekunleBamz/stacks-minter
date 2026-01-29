import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  StacksProvider as StacksConnectProvider,
  useConnect,
  useSTXAddress,
  useUserData,
  openAuth,
  openContractCall,
  finishedAuth
} from '@stacks/connect'
import { 
  AnchorMode, 
  PostConditionMode, 
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  uintCV,
  stringAsciiCV,
  stringUtf8CV,
  tupleCV,
  listCV,
  standardPrincipalCV,
  createAssetInfo
} from '@stacks/transactions'

const StacksContext = createContext()

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

  const connectWallet = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      await openAuth({
        appDetails: {
          name: 'Stacks NFT Minter',
          icon: window.location.origin + '/favicon.ico'
        },
        redirectTo: '/',
        onFinish: () => {
          setIsConnected(true)
          setError(null)
        },
        userSession: new StacksConnectProvider()
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    const userSession = new StacksConnectProvider()
    userSession.signUserOut()
    setIsConnected(false)
    setUserData(null)
    setBalance(null)
  }

  const mintNFT = async (contractAddress, contractName, amount = 0.1) => {
    try {
      setIsLoading(true)
      setError(null)

      const stxAddress = useSTXAddress()
      const postCondition = makeStandardSTXPostCondition(
        stxAddress,
        FungibleConditionCode.Equal,
        amount * 1000000 // Convert STX to microSTX
      )

      const txOptions = {
        contractAddress,
        contractName,
        functionName: 'mint-nft',
        functionArgs: [
          stringAsciiCV('NFT Collection'),
          stringAsciiCV('NFT'),
          stringAsciiCV('https://api.example.com/metadata/'),
          stringAsciiCV('https://example.com/image/'),
          uintCV(1000) // Max supply
        ],
        network: {
          url: 'https://stacks-node-api.mainnet.stacks.co'
        },
        appDetails: {
          name: 'Stacks NFT Minter',
          icon: window.location.origin + '/favicon.ico'
        },
        postConditionMode: PostConditionMode.Deny,
        postConditions: [postCondition],
        anchorMode: AnchorMode.Any,
        fee: 0.0001, // 0.1 microSTX
        onComplete: (data) => {
          console.log('Transaction completed:', data)
        }
      }

      await openContractCall(txOptions)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    isConnected,
    userData,
    balance,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    mintNFT
  }

  return (
    <StacksContext.Provider value={value}>
      {children}
    </StacksContext.Provider>
  )
}