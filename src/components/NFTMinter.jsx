import React, { useState, useEffect } from 'react'
import { useStacks } from '../contexts/StacksContext.jsx'
import { useConnect } from '@stacks/connect'
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
import { 
  Box, 
  User, 
  Coins, 
  Zap, 
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react'

const NFTMinter = () => {
  const { userData, isLoading, error, mintNFT } = useStacks()
  const { doContractCall } = useConnect()
  const [amount, setAmount] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  const [txStatus, setTxStatus] = useState(null)

  const contractAddress = 'SP3K8BC0PPEVC2V33PY5NA70F34CN5Z2E0HJ52M91' // Replace with your deployed contract
  const contractName = 'nft-collection'

  const handleMint = async () => {
    if (!userData) {
      alert('Please connect your wallet first')
      return
    }

    setIsMinting(true)
    setTxStatus('Preparing transaction...')

    try {
      const stxAddress = userData.address
      const totalCost = amount * 0.1 // 0.1 STX per NFT

      const postCondition = makeStandardSTXPostCondition(
        stxAddress,
        FungibleConditionCode.Equal,
        Math.floor(totalCost * 1000000) // Convert to microSTX
      )

      setTxStatus('Awaiting wallet confirmation...')

      await doContractCall({
        contractAddress,
        contractName,
        functionName: 'mint-nft',
        functionArgs: [
          stringAsciiCV('Stacks NFT Collection'),
          stringAsciiCV('STACKS-NFT'),
          stringAsciiCV('https://api.stacks-nft.com/metadata/'),
          stringAsciiCV('https://stacks-nft.com/images/'),
          uintCV(amount)
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
          setTxStatus('Transaction completed!')
          console.log('Transaction completed:', data)
        },
        onCancel: () => {
          setTxStatus('Transaction cancelled')
          setIsMinting(false)
        }
      })
    } catch (err) {
      setTxStatus(`Error: ${err.message}`)
      console.error('Minting error:', err)
    } finally {
      setIsMinting(false)
    }
  }

  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-2">
          Stacks NFT Minter
        </h1>
        <p className="text-gray-600">
          Mint your NFTs on Stacks Blockchain for just 0.1 STX each
        </p>
      </div>

      {/* Status Card */}
      {userData && (
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-stacks-blue/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-stacks-blue" />
              </div>
              <div>
                <div className="font-semibold">Connected Wallet</div>
                <div className="text-sm text-gray-500">
                  {formatAddress(userData.address)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">Balance</div>
              <div className="text-sm text-gray-500">Loading...</div>
            </div>
          </div>
        </div>
      )}

      {/* Minting Interface */}
      <div className="card">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Minting Form */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Mint NFTs</h2>
            <p className="text-gray-600 mb-6">
              Each NFT costs 0.1 STX. You can mint multiple NFTs at once.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of NFTs to Mint
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
                  className="input-field"
                  disabled={isMinting}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Total cost: {(amount * 0.1).toFixed(1)} STX
                </p>
              </div>

              <button
                onClick={handleMint}
                disabled={isMinting || !userData}
                className="btn-primary w-full py-3 text-lg font-semibold"
              >
                {isMinting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Mint ${amount} NFT${amount > 1 ? 's' : ''} - ${(amount * 0.1).toFixed(1)} STX`
                )}
              </button>

              {txStatus && (
                <div className={`mt-4 p-3 rounded-lg ${
                  txStatus.includes('Error') 
                    ? 'bg-red-50 border border-red-200' 
                    : txStatus.includes('completed') 
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    {txStatus.includes('Error') ? (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    ) : txStatus.includes('completed') ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Zap className="w-4 h-4 text-blue-500" />
                    )}
                    <span className={`text-sm ${
                      txStatus.includes('Error') 
                        ? 'text-red-700' 
                        : txStatus.includes('completed') 
                        ? 'text-green-700'
                        : 'text-blue-700'
                    }`}>
                      {txStatus}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Features</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Low Cost</h4>
                  <p className="text-sm text-gray-600">Only 0.1 STX per NFT</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Fast Transactions</h4>
                  <p className="text-sm text-gray-600">Powered by Stacks blockchain</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Box className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Unique NFTs</h4>
                  <p className="text-sm text-gray-600">Each NFT is unique and verifiable</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Coins className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium">Multiple Minting</h4>
                  <p className="text-sm text-gray-600">Mint up to 100 NFTs at once</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Contract Address</h4>
              <p className="text-sm font-mono text-gray-600 break-all">
                {contractAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTMinter