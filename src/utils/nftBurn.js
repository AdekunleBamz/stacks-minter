import { callContract, broadcastTransaction } from '@stacks/transactions'

export const burnNFT = async ({ tokenId, contractAddress, contractName, senderKey, network }) => {
  const tx = await callContract({
    contractAddress,
    contractName,
    functionName: 'burn',
    functionArgs: [tokenId],
    senderKey,
    network
  })
  return broadcastTransaction(tx, network)
}

export const getBurnCount = async ({ contractAddress, contractName, network }) => {
  return callContract({
    contractAddress,
    contractName,
    functionName: 'get-burn-count',
    functionArgs: [],
    network
  })
}
