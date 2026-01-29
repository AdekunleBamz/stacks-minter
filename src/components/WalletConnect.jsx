import React from 'react'
import { useStacks } from '../contexts/StacksContext.jsx'
import { ConnectButton } from '@stacks/connect-react'

const WalletConnect = () => {
  const { isConnected, userData, disconnectWallet, isLoading, error } = useStacks()

  if (isConnected && userData) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border">
          <div className="w-8 h-8 bg-stacks-blue rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {userData.profile?.name?.charAt(0) || userData.username?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-900">
              {userData.profile?.name || userData.username || 'Connected User'}
            </div>
            <div className="text-gray-500 font-mono text-xs">
              {userData.address?.slice(0, 6)}...{userData.address?.slice(-4)}
            </div>
          </div>
        </div>
        <button
          onClick={disconnectWallet}
          className="btn-secondary"
          disabled={isLoading}
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <ConnectButton
      className="btn-primary"
      disabled={isLoading}
      onConnect={() => {}}
      onDisconnect={() => {}}
    >
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </ConnectButton>
  )
}

export default WalletConnect