import { callContract } from '@stacks/transactions'

export const setRoyalty = async ({ recipient, royalty, contractAddress, contractName, senderKey, network }) => {
  return callContract({
    contractAddress,
    contractName,
    functionName: 'set-royalty',
    functionArgs: [recipient, royalty],
    senderKey,
    network
  })
}

export const getRoyaltyInfo = async ({ tokenId, contractAddress, contractName, network }) => {
  return callContract({
    contractAddress,
    contractName,
    functionName: 'get-royalty-info',
    functionArgs: [tokenId],
    network
  })
}
