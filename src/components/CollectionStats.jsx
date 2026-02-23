import React from 'react'

const CollectionStats = ({ stats }) => {
  const { totalMinted, totalOwners, floorPrice, volume } = stats || {}
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gray-800 rounded-lg p-4">
        <p className="text-gray-400 text-sm">Total Minted</p>
        <p className="text-2xl font-bold">{totalMinted || 0}</p>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <p className="text-gray-400 text-sm">Owners</p>
        <p className="text-2xl font-bold">{totalOwners || 0}</p>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <p className="text-gray-400 text-sm">Floor Price</p>
        <p className="text-2xl font-bold">{floorPrice || 0} STX</p>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <p className="text-gray-400 text-sm">Volume</p>
        <p className="text-2xl font-bold">{volume || 0} STX</p>
      </div>
    </div>
  )
}

export default CollectionStats
