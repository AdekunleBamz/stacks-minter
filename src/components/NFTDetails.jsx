import React from 'react'

const NFTDetails = ({ nft }) => {
  if (!nft) return null
  
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <img src={nft.image} alt={nft.name} className="w-full rounded-lg mb-4" />
      <h2 className="text-2xl font-bold mb-2">{nft.name}</h2>
      <p className="text-gray-400 mb-4">{nft.description}</p>
      {nft.attributes?.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {nft.attributes.map((attr, i) => (
            <div key={i} className="bg-gray-700 rounded p-2">
              <span className="text-gray-400 text-sm">{attr.trait_type}</span>
              <p className="font-medium">{String(attr.value)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default NFTDetails
