/**
 * IPFS Upload Utilities
 */

export const uploadToIPFS = async (file) => {
  // IPFS upload placeholder
  const formData = new FormData()
  formData.append('file', file)
  
  // Would integrate with Pinata, NFT.Storage, etc.
  return { hash: 'QmPlaceholder', url: `https://ipfs.io/ipfs/QmPlaceholder` }
}

export const uploadMetadata = async (metadata) => {
  const json = JSON.stringify(metadata)
  const blob = new Blob([json], { type: 'application/json' })
  return uploadToIPFS(blob)
}
