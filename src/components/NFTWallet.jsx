import React from 'react'

const NFTWallet = ({ address, balance }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <p className="text-gray-400 text-sm">Wallet</p>
      <p className="font-mono text-lg">{address?.slice(0, 8)}...</p>
      <p className="text-purple-400">{balance} STX</p>
    </div>
  )
}

export default NFTWallet
