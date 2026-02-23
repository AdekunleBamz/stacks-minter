import { callContract, broadcastTransaction } from '@stacks/transactions'

export const batchMint = async ({ addresses, amounts, contractAddress, contractName, senderKey, network }) => {
  const results = []
  for (const addr of addresses) {
    const tx = await callContract({
      contractAddress,
      contractName,
      functionName: 'mint',
      functionArgs: [addr, amounts],
      senderKey,
      network
    })
    const result = await broadcastTransaction(tx, network)
    results.push(result)
  }
  return results
}
