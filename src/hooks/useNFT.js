import { useState, useEffect } from 'react'

export const useNFT = (contractAddress, tokenId) => {
  const [nft, setNft] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNFT = async () => {
      if (!contractAddress || !tokenId) return
      try {
        setLoading(true)
        // Fetch NFT data from contract
        const data = { contractAddress, tokenId, owner: 'unknown' }
        setNft(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchNFT()
  }, [contractAddress, tokenId])

  return { nft, loading, error }
}

export const useNFTCollection = (contractAddress) => {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [contractAddress])

  return { nfts, loading }
}
