import React from 'react'

const NFTLinks = ({ explorer, ipfs }) => {
  return (
    <div className="flex gap-4">
      {explorer && <a href={explorer} target="_blank" rel="noopener" className="text-purple-400">Explorer</a>}
      {ipfs && <a href={ipfs} target="_blank" rel="noopener" className="text-purple-400">IPFS</a>}
    </div>
  )
}

export default NFTLinks
