import React from 'react'

const NFTPreview = ({ nft, size = 'md' }) => {
  const sizes = { sm: 100, md: 200, lg: 300 }
  return (
    <img src={nft?.image} alt={nft?.name} style={{ width: sizes[size], height: sizes[size] }} className="rounded-lg object-cover" />
  )
}

export default NFTPreview
