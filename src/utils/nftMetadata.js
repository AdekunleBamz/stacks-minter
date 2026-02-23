/**
 * NFT Metadata Utilities
 * For creating and managing NFT metadata following standards
 */

export const createNFTMetadata = ({ name, description, image, attributes = [] }) => {
  return {
    name,
    description,
    image,
    attributes: attributes.map(attr => ({
      trait_type: attr.traitType,
      value: attr.value,
      display_type: attr.displayType || null
    })),
    properties: {
      files: [{ uri: image, type: 'image/png' }]
    }
  }
}

export const validateMetadata = (metadata) => {
  if (!metadata.name) return { valid: false, error: 'Name is required' }
  if (!metadata.image) return { valid: false, error: 'Image is required' }
  return { valid: true, error: null }
}

export const parseIPFSURL = (ipfsHash) => {
  return `https://ipfs.io/ipfs/${ipfsHash.replace('ipfs://', '')}`
}

export const formatNFTAttributes = (traits) => {
  return traits.map(trait => ({
    traitType: trait.type,
    value: trait.value,
    displayType: trait.display
  }))
}
