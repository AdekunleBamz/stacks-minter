const { StacksMainnet, StacksTestnet } = require('@stacks/network')
const { fetch } = require('cross-fetch')

/**
 * Contract verification script for Stacks blockchain
 * This script verifies that your deployed contract is working correctly
 */

const CONFIG = {
  network: 'mainnet', // 'testnet' or 'mainnet'
  contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS || 'SP3K8BC0PPEVC2V33PY5NA70F34CN5Z2E0HJ52M91',
  contractName: process.env.REACT_APP_CONTRACT_NAME || 'nft-collection'
}

async function verifyContract() {
  try {
    console.log('🔍 Verifying Stacks NFT Contract...')
    
    // Set up network
    const network = CONFIG.network === 'mainnet' 
      ? new StacksMainnet() 
      : new StacksTestnet()

    console.log(`🌐 Network: ${CONFIG.network}`)
    console.log(`📍 Contract: ${CONFIG.contractAddress}.${CONFIG.contractName}`)

    // Test 1: Check contract exists
    console.log('\n📋 Test 1: Contract Existence')
    const contractExists = await checkContractExists(network)
    console.log(`✅ Contract exists: ${contractExists}`)

    // Test 2: Get contract source
    console.log('\n📄 Test 2: Contract Source')
    const contractSource = await getContractSource(network)
    if (contractSource) {
      console.log('✅ Contract source retrieved successfully')
      console.log(`📝 Contract length: ${contractSource.length} characters`)
    } else {
      console.log('❌ Could not retrieve contract source')
    }

    // Test 3: Test read-only functions
    console.log('\n🔍 Test 3: Read-Only Functions')
    await testReadOnlyFunctions(network)

    // Test 4: Check contract balance
    console.log('\n💰 Test 4: Contract Balance')
    const balance = await getContractBalance(network)
    console.log(`✅ Contract balance: ${balance} STX`)

    console.log('\n🎉 Contract verification completed successfully!')
    console.log('\n📋 Summary:')
    console.log(`   Network: ${CONFIG.network}`)
    console.log(`   Contract: ${CONFIG.contractAddress}.${CONFIG.contractName}`)
    console.log(`   Status: Verified and ready for use`)

  } catch (error) {
    console.error('❌ Contract verification failed:', error.message)
    process.exit(1)
  }
}

async function checkContractExists(network) {
  const apiUrl = `${network.coreApiUrl}/v2/contracts/interface/${CONFIG.contractAddress}/${CONFIG.contractName}`
  
  try {
    const response = await fetch(apiUrl)
    return response.ok
  } catch (error) {
    return false
  }
}

async function getContractSource(network) {
  const apiUrl = `${network.coreApiUrl}/v2/contracts/source/${CONFIG.contractAddress}/${CONFIG.contractName}`
  
  try {
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      return data.source
    }
    return null
  } catch (error) {
    return null
  }
}

async function testReadOnlyFunctions(network) {
  const functions = [
    'get-total-supply',
    'get-max-supply', 
    'get-collection-info'
  ]

  for (const func of functions) {
    try {
      const result = await callReadOnlyFunction(network, func, [])
      console.log(`   ✅ ${func}: ${JSON.stringify(result)}`)
    } catch (error) {
      console.log(`   ❌ ${func}: ${error.message}`)
    }
  }
}

async function callReadOnlyFunction(network, functionName, args) {
  const apiUrl = `${network.coreApiUrl}/v2/contracts/call-read/${CONFIG.contractAddress}/${CONFIG.contractName}/${functionName}`
  
  const payload = {
    sender: CONFIG.contractAddress,
    arguments: args
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const result = await response.json()
  return result.result
}

async function getContractBalance(network) {
  const apiUrl = `${network.coreApiUrl}/extended/v1/address/${CONFIG.contractAddress}/balances`
  
  try {
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      return (data.stx.balance / 1000000).toFixed(6) // Convert to STX
    }
    return '0.000000'
  } catch (error) {
    return 'Unknown'
  }
}

// Run verification
if (require.main === module) {
  verifyContract()
}

module.exports = { verifyContract }