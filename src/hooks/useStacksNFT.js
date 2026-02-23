import { useState, useEffect } from 'react'

export const useStacksNFT = (contractAddress) => {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setLoading(false)
  }, [contractAddress])
  
  return { nfts, loading }
}
