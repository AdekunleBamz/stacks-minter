import React from 'react'

const NFTGallery = ({ nfts, onSelect }) => {
  if (!nfts || nfts.length === 0) {
    return <div className="text-gray-400">No NFTs found</div>
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {nfts.map((nft, i) => (
        <div 
          key={i} 
          onClick={() => onSelect?.(nft)}
          className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-purple-500"
        >
          <img src={nft.image} alt={nft.name} className="w-full aspect-square object-cover" />
          <div className="p-3">
            <h3 className="font-medium truncate">{nft.name}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NFTGallery
