const { makeRandomPrivKey, publicKeyFromPrivate, getAddressFromPrivateKey } = require('@stacks/transactions')

/**
 * Wallet setup utility for Stacks NFT Minter
 * This script helps you generate and manage wallet keys for deployment
 */

function generateWallet() {
  console.log('🔐 Generating new Stacks wallet...')
  
  // Generate a random private key
  const privateKey = makeRandomPrivKey()
  const privateKeyHex = privateKey.data.toString('hex')
  
  // Get public key
  const publicKey = publicKeyFromPrivate(privateKey)
  const publicKeyHex = publicKey.data.toString('hex')
  
  // Get addresses
  const mainnetAddress = getAddressFromPrivateKey(privateKeyHex, 'mainnet')
  const testnetAddress = getAddressFromPrivateKey(privateKeyHex, 'testnet')
  
  console.log('\n🎉 New Wallet Generated!')
  console.log('\n📋 Wallet Information:')
  console.log('='.repeat(50))
  console.log(`🔑 Private Key: ${privateKeyHex}`)
  console.log(`📤 Public Key: ${publicKeyHex}`)
  console.log(`🌐 Mainnet Address: ${mainnetAddress}`)
  console.log(`🧪 Testnet Address: ${testnetAddress}`)
  console.log('='.repeat(50))
  
  console.log('\n⚠️  SECURITY WARNING:')
  console.log('• Never share your private key with anyone')
  console.log('• Store it in a secure location')
  console.log('• Consider using a hardware wallet for mainnet')
  console.log('• This private key is for demonstration only')
  
  console.log('\n📝 Next Steps:')
  console.log('1. Copy the private key to your .env file')
  console.log('2. Fund the mainnet address with STX for deployment')
  console.log('3. Fund the testnet address for testing')
  console.log('4. Use the testnet address first to verify everything works')
  
  return {
    privateKey: privateKeyHex,
    publicKey: publicKeyHex,
    mainnetAddress,
    testnetAddress
  }
}

function validatePrivateKey(privateKey) {
  try {
    const address = getAddressFromPrivateKey(privateKey, 'mainnet')
    console.log(`✅ Valid private key!`)
    console.log(`📍 Mainnet Address: ${address}`)
    return true
  } catch (error) {
    console.log(`❌ Invalid private key: ${error.message}`)
    return false
  }
}

function getFundingInfo() {
  console.log('\n💰 Funding Your Wallet')
  console.log('='.repeat(50))
  console.log('TESTNET (For Testing):')
  console.log('• Visit: https://faucet.testnet.stacks.org/')
  console.log('• Enter your testnet address')
  console.log('• Request test STX for free')
  console.log('')
  console.log('MAINNET (For Production):')
  console.log('• Use a Stacks-compatible exchange')
  console.log('• Send STX to your mainnet address')
  console.log('• Ensure you have enough for deployment fees')
  console.log('='.repeat(50))
}

function showDeploymentCommands() {
  console.log('\n🚀 Deployment Commands')
  console.log('='.repeat(50))
  console.log('1. Set environment variables:')
  console.log('   export STACKS_PRIVATE_KEY=your-private-key-here')
  console.log('   export STACKS_NETWORK=mainnet')
  console.log('')
  console.log('2. Deploy to testnet first:')
  console.log('   export STACKS_NETWORK=testnet')
  console.log('   node scripts/deploy-contract.js')
  console.log('')
  console.log('3. Test the deployment:')
  console.log('   node scripts/test-contract.js')
  console.log('')
  console.log('4. Deploy to mainnet:')
  console.log('   export STACKS_NETWORK=mainnet')
  console.log('   node scripts/deploy-contract.js')
  console.log('='.repeat(50))
}

// CLI Interface
const args = process.argv.slice(2)
const command = args[0]

switch (command) {
  case 'generate':
    generateWallet()
    break
    
  case 'validate':
    const key = args[1]
    if (!key) {
      console.log('Usage: node scripts/setup-wallet.js validate <private-key>')
      process.exit(1)
    }
    validatePrivateKey(key)
    break
    
  case 'funding':
    getFundingInfo()
    break
    
  case 'commands':
    showDeploymentCommands()
    break
    
  case 'help':
  default:
    console.log('\n🛠️  Stacks NFT Minter - Wallet Setup')
    console.log('='.repeat(50))
    console.log('Commands:')
    console.log('  generate    - Generate a new wallet')
    console.log('  validate    - Validate a private key')
    console.log('  funding     - Show funding information')
    console.log('  commands    - Show deployment commands')
    console.log('  help        - Show this help message')
    console.log('='.repeat(50))
    console.log('\nExample usage:')
    console.log('  node scripts/setup-wallet.js generate')
    console.log('  node scripts/setup-wallet.js validate your-private-key')
    break
}