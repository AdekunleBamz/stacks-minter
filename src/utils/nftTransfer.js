import { callContract, broadcastTransaction } from '@stacks/transactions'

export const transferNFT = async ({ recipient, tokenId, contractAddress, contractName, senderKey, network }) => {
  const tx = await callContract({
    contractAddress,
    contractName,
    functionName: 'transfer',
    functionArgs: [recipient, tokenId],
    senderKey,
    network
  })
  return broadcastTransaction(tx, network)
}

export const getNFTOwner = async ({ tokenId, contractAddress, contractName, network }) => {
  const result = await callContract({
    contractAddress,
    contractName,
    functionName: 'get-owner',
    functionArgs: [tokenId],
    network
  })
  return result
}
