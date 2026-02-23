import React from 'react'

const ShareNFT = ({ nft }) => {
  const share = async () => {
    if (nftUrl) {
      await navigator.clipboard.writeText(nftUrl)
    }
  }
  const nftUrl = window?.location?.origin + '/nft/' + nft?.id
  
  return (
    <button onClick={share} className="bg-purple-600 px-4 py-2 rounded">
      Share
    </button>
  )
}

export default ShareNFT
