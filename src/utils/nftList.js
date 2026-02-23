import { callContract, broadcastTransaction } from '@stacks/transactions'

export const listNFT = async ({ price, tokenId, contractAddress, contractName, senderKey, network }) => {
  const tx = await callContract({
    contractAddress,
    contractName,
    functionName: 'list-nft',
    functionArgs: [price, tokenId],
    senderKey,
    network
  })
  return broadcastTransaction(tx, network)
}

export const unlistNFT = async ({ tokenId, contractAddress, contractName, senderKey, network }) => {
  const tx = await callContract({
    contractAddress,
    contractName,
    functionName: 'unlist-nft',
    functionArgs: [tokenId],
    senderKey,
    network
  })
  return broadcastTransaction(tx, network)
}

export const buyNFT = async ({ tokenId, price, contractAddress, contractName, senderKey, network }) => {
  const tx = await callContract({
    contractAddress,
    contractName,
    functionName: 'buy-nft',
    functionArgs: [tokenId],
    senderKey,
    network
  })
  return broadcastTransaction(tx, network)
}
