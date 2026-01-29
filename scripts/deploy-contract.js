const { ClarityAbi, ClarityType, cvToHex, hexToCV } = require('@stacks/transactions')
const { StacksTestnet, StacksMainnet } = require('@stacks/network')
const { makeSTXTokenTransfer, makeContractDeploy } = require('@stacks/transactions')
const fs = require('fs')
const path = require('path')

// Configuration
const CONFIG = {
  network: 'mainnet', // 'testnet' or 'mainnet'
  contractName: 'nft-collection',
  contractFile: path.join(__dirname, '../contracts/nft-collection.clar'),
  deployerPrivateKey: process.env.STACKS_PRIVATE_KEY, // Set this in your environment
  fee: 0.0001, // 0.1 microSTX
  nonce: 0 // You'll need to update this based on your account
}

async function deployContract() {
  try {
    console.log('🚀 Starting Stacks NFT Contract Deployment...')
    
    // Validate configuration
    if (!CONFIG.deployerPrivateKey) {
      throw new Error('STACKS_PRIVATE_KEY environment variable is required')
    }

    // Read contract source
    const contractSource = fs.readFileSync(CONFIG.contractFile, 'utf8')
    console.log('📄 Contract source loaded successfully')

    // Set up network
    const network = CONFIG.network === 'mainnet' 
      ? new StacksMainnet() 
      : new StacksTestnet()

    console.log(`🌐 Using ${CONFIG.network} network`)
    console.log(`📡 API URL: ${network.coreApiUrl}`)

    // Get account info
    const { address, nonce } = await getAccountInfo(CONFIG.deployerPrivateKey, network)
    console.log(`👤 Deployer address: ${address}`)
    console.log(`🔢 Current nonce: ${nonce}`)

    // Deploy contract
    const tx = await makeContractDeploy({
      contractName: CONFIG.contractName,
      codeBody: contractSource,
      fee: Math.floor(CONFIG.fee * 1000000), // Convert to microSTX
      nonce: nonce,
      network: network,
      anchorMode: 3, // AnchorMode.Any
    })

    console.log('📦 Contract deployment transaction created')
    console.log(`💰 Fee: ${CONFIG.fee} STX`)
    console.log(`🆔 Transaction ID: ${cvToHex(tx.payload)}`)

    // Broadcast transaction
    const response = await broadcastTransaction(tx, network)
    
    if (response.error) {
      throw new Error(`Transaction failed: ${response.reason}`)
    }

    console.log('✅ Contract deployed successfully!')
    console.log(`🔗 Transaction ID: ${response.txid}`)
    console.log(`📍 Contract address: ${address}.${CONFIG.contractName}`)

    // Wait for confirmation
    console.log('⏳ Waiting for transaction confirmation...')
    await waitForConfirmation(response.txid, network)

    console.log('🎉 Deployment complete!')
    console.log('\n📋 Contract Information:')
    console.log(`   Address: ${address}.${CONFIG.contractName}`)
    console.log(`   Network: ${CONFIG.network}`)
    console.log(`   Explorer: ${getExplorerUrl(response.txid, CONFIG.network)}`)

  } catch (error) {
    console.error('❌ Deployment failed:', error.message)
    process.exit(1)
  }
}

async function getAccountInfo(privateKey, network) {
  // This is a simplified version - in production, you'd use the Stacks API
  // to get the actual nonce and address
  const address = 'SP3K8BC0PPEVC2V33PY5NA70F34CN5Z2E0HJ52M91' // Replace with actual address
  const nonce = CONFIG.nonce
  
  return { address, nonce }
}

async function broadcastTransaction(tx, network) {
  // This is a simplified version - in production, you'd use the actual Stacks API
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

function getExplorerUrl(txid, network) {
  const baseUrl = network.coreApiUrl.includes('mainnet')
    ? 'https://explorer.stacks.org'
    : 'https://explorer.testnet.stacks.org'
  
  return `${baseUrl}/txid/${txid}`
}

// Run deployment
if (require.main === module) {
  deployContract()
}

module.exports = { deployContract }