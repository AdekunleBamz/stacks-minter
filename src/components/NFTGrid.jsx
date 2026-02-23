import React from 'react'

const NFTGrid = ({ nfts, loading, onSelect }) => {
  if (loading) return <div>Loading...</div>
  if (!nfts?.length) return <div>No NFTs found</div>
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {nfts.map((nft, i) => (
        <div key={i} onClick={() => onSelect?.(nft)} className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all">
          <img src={nft.image} alt={nft.name} className="w-full aspect-square object-cover" />
          <div className="p-2">
            <p className="font-medium truncate">{nft.name}</p>
            <p className="text-purple-400 text-sm">{nft.price} STX</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NFTGrid
