const { ClarityAbi, ClarityType, cvToHex, hexToCV } = require('@stacks/transactions')
const { StacksTestnet, StacksMainnet } = require('@stacks/network')
const { makeContractCall, makeSTXTokenTransfer } = require('@stacks/transactions')
const fs = require('fs')
const path = require('path')

// Configuration
const CONFIG = {
  network: 'testnet', // Start with testnet for testing
  contractAddress: 'SP3K8BC0PPEVC2V33PY5NA70F34CN5Z2E0HJ52M91', // Replace with actual address after deployment
  contractName: 'nft-collection',
  testPrivateKey: process.env.STACKS_TEST_PRIVATE_KEY, // Set this in your environment
  fee: 0.0001, // 0.1 microSTX
  nonce: 0
}

async function testContract() {
  try {
    console.log('🧪 Starting Stacks NFT Contract Tests...')
    
    // Validate configuration
    if (!CONFIG.testPrivateKey) {
      throw new Error('STACKS_TEST_PRIVATE_KEY environment variable is required')
    }

    // Set up network
    const network = CONFIG.network === 'mainnet' 
      ? new StacksMainnet() 
      : new StacksTestnet()

    console.log(`🌐 Using ${CONFIG.network} network`)
    console.log(`📡 API URL: ${network.coreApiUrl}`)

    // Test 1: Get collection info
    console.log('\n📋 Test 1: Get Collection Info')
    const collectionInfo = await getCollectionInfo(network)
    console.log('✅ Collection Info:', collectionInfo)

    // Test 2: Get total supply
    console.log('\n📊 Test 2: Get Total Supply')
    const totalSupply = await getTotalSupply(network)
    console.log('✅ Total Supply:', totalSupply)

    // Test 3: Mint NFT
    console.log('\n🪙 Test 3: Mint NFT')
    const mintResult = await mintNFT(1, network) // Mint 1 NFT
    console.log('✅ Mint Result:', mintResult)

    // Test 4: Get updated total supply
    console.log('\n📈 Test 4: Get Updated Total Supply')
    const newTotalSupply = await getTotalSupply(network)
    console.log('✅ New Total Supply:', newTotalSupply)

    // Test 5: Get owner of minted NFT
    console.log('\n👤 Test 5: Get Owner of Minted NFT')
    const owner = await getOwnerOf(newTotalSupply - 1, network) // Get last minted NFT
    console.log('✅ Owner:', owner)

    console.log('\n🎉 All tests completed successfully!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    process.exit(1)
  }
}

async function getCollectionInfo(network) {
  const contractAddress = CONFIG.contractAddress
  const contractName = CONFIG.contractName
  
  const tx = await makeContractCall({
    contractAddress,
    contractName,
    functionName: 'get-collection-info',
    functionArgs: [],
    network,
    fee: Math.floor(CONFIG.fee * 1000000),
    nonce: CONFIG.nonce,
    anchorMode: 3,
  })

  return await broadcastTransaction(tx, network)
}

async function getTotalSupply(network) {
  const contractAddress = CONFIG.contractAddress
  const contractName = CONFIG.contractName
  
  const tx = await makeContractCall({
    contractAddress,
    contractName,
    functionName: 'get-total-supply',
    functionArgs: [],
    network,
    fee: Math.floor(CONFIG.fee * 1000000),
    nonce: CONFIG.nonce,
    anchorMode: 3,
  })

  return await broadcastTransaction(tx, network)
}

async function mintNFT(amount, network) {
  const contractAddress = CONFIG.contractAddress
  const contractName = CONFIG.contractName
  
  const tx = await makeContractCall({
    contractAddress,
    contractName,
    functionName: 'mint-nft',
    functionArgs: [amount], // Mint 1 NFT
    network,
    fee: Math.floor(CONFIG.fee * 1000000),
    nonce: CONFIG.nonce,
    anchorMode: 3,
  })

  return await broadcastTransaction(tx, network)
}

async function getOwnerOf(tokenId, network) {
  const contractAddress = CONFIG.contractAddress
  const contractName = CONFIG.contractName
  
  const tx = await makeContractCall({
    contractAddress,
    contractName,
    functionName: 'get-owner-of',
    functionArgs: [tokenId],
    network,
    fee: Math.floor(CONFIG.fee * 1000000),
    nonce: CONFIG.nonce,
    anchorMode: 3,
  })

  return await broadcastTransaction(tx, network)
}

async function broadcastTransaction(tx, network) {
  const apiUrl = `${network.coreApiUrl}/v2/transactions`
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: tx.serialize()
    })

    const result = await response.json()
    
    if (result.error) {
      throw new Error(`Transaction failed: ${result.reason}`)
    }

    // Wait for confirmation
    await waitForConfirmation(result.txid, network)
    
    return result
  } catch (error) {
    throw new Error(`Failed to broadcast transaction: ${error.message}`)
  }
}

async function waitForConfirmation(txid, network, maxAttempts = 60) {
  const apiUrl = `${network.coreApiUrl}/v2/transactions/${txid}`
  
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(apiUrl)
      const result = await response.json()
      
      if (result.tx_status === 'success') {
        return true
      } else if (result.tx_status === 'failed') {
        throw new Error(`Transaction failed: ${result.reason}`)
      }
    } catch (error) {
      console.log(`Attempt ${i + 1}/${maxAttempts}: ${error.message}`)
    }
    
    await new Promise(resolve => setTimeout(resolve, 10000)) // Wait 10 seconds
  }
  
  throw new Error('Transaction confirmation timeout')
}

// Run tests
if (require.main === module) {
  testContract()
}

module.exports = { testContract }