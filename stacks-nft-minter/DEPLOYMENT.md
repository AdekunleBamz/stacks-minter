# Stacks NFT Minter - Mainnet Deployment Guide

This guide will walk you through deploying your NFT contract to Stacks Mainnet and getting your frontend ready for production.

## 🚀 Prerequisites

### 1. Stacks Wallet Setup
- Install the [Hiro Wallet](https://www.hiro.so/wallet) browser extension
- Create or import your Stacks wallet
- **IMPORTANT**: Ensure your wallet has enough STX for deployment and transactions

### 2. Get Test STX (for testing first)
Before mainnet deployment, test on testnet:
- Visit [Stacks Testnet Faucet](https://faucet.testnet.stacks.org/)
- Request test STX for your wallet address
- This allows you to test the contract before spending real STX

## 📋 Pre-Deployment Checklist

### Contract Verification
- [ ] Smart contract compiles without errors
- [ ] Contract tested on testnet successfully
- [ ] All functions work as expected
- [ ] Error handling is comprehensive

### Environment Setup
- [ ] Mainnet wallet address identified
- [ ] Private key secured (NEVER share this)
- [ ] Environment variables configured
- [ ] Deployment scripts tested

### Frontend Configuration
- [ ] Contract address updated in frontend
- [ ] Network configuration set to mainnet
- [ ] API endpoints configured for mainnet
- [ ] All components tested

## 🔧 Step-by-Step Deployment

### Step 1: Environment Configuration

Create `.env` file with your deployment settings:

```bash
# Contract Deployment Configuration
STACKS_PRIVATE_KEY=your-12-word-or-hex-private-key-here
STACKS_NETWORK=mainnet
CONTRACT_NAME=nft-collection
FEE=0.0001  # 0.1 microSTX

# Frontend Configuration
REACT_APP_NETWORK=mainnet
REACT_APP_STACKS_API_URL=https://stacks-node-api.mainnet.stacks.co
REACT_APP_CONTRACT_NAME=nft-collection
# Contract address will be filled after deployment
```

**⚠️ SECURITY WARNING**: 
- Never commit `.env` file to version control
- Use `.gitignore` to exclude it
- Consider using a hardware wallet for mainnet deployment

### Step 2: Test on Testnet First

```bash
# 1. Update deployment script for testnet
export STACKS_NETWORK=testnet

# 2. Deploy to testnet
node scripts/deploy-contract.js

# 3. Test all functionality
node scripts/test-contract.js

# 4. Test frontend with testnet
npm run dev
```

### Step 3: Mainnet Deployment

```bash
# 1. Switch to mainnet
export STACKS_NETWORK=mainnet

# 2. Deploy contract to mainnet
node scripts/deploy-contract.js
```

**Expected Output:**
```
🚀 Starting Stacks NFT Contract Deployment...
📄 Contract source loaded successfully
🌐 Using mainnet network
📡 API URL: https://stacks-node-api.mainnet.stacks.co
👤 Deployer address: SPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
🔢 Current nonce: 0
📦 Contract deployment transaction created
💰 Fee: 0.0001 STX
✅ Contract deployed successfully!
🔗 Transaction ID: 0x...
📍 Contract address: SPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.nft-collection
⏳ Waiting for transaction confirmation...
🎉 Deployment complete!
```

### Step 4: Update Frontend Configuration

After successful deployment, update your frontend:

```bash
# Update .env.local with the deployed contract address
REACT_APP_CONTRACT_ADDRESS=SPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 5: Build and Deploy Frontend

```bash
# 1. Build for production
npm run build

# 2. Deploy to your hosting platform
# Vercel
vercel

# Netlify
netlify deploy

# Or deploy dist/ folder to your preferred hosting
```

## 🧪 Post-Deployment Testing

### 1. Contract Verification
- Visit [Stacks Explorer](https://explorer.stacks.org/)
- Search for your contract address
- Verify contract code is deployed correctly
- Check transaction status

### 2. Frontend Testing
- Connect wallet on your deployed frontend
- Test NFT minting with small amounts first
- Verify transaction confirmations
- Test all UI interactions

### 3. Integration Testing
- Mint a test NFT
- Verify ownership transfer works
- Check metadata retrieval
- Test admin functions (if applicable)

## 📊 Monitoring and Maintenance

### Contract Monitoring
- Monitor contract activity on Stacks Explorer
- Track NFT minting statistics
- Watch for any failed transactions
- Monitor STX balance for gas fees

### Frontend Monitoring
- Monitor user activity and errors
- Track wallet connection success rate
- Monitor transaction completion rates
- Set up error reporting

## 🚨 Common Issues and Solutions

### Deployment Issues
**Problem**: "Insufficient balance"
**Solution**: Ensure wallet has enough STX for deployment fees

**Problem**: "Nonce mismatch"
**Solution**: Get current nonce from wallet and update deployment script

**Problem**: "Contract compilation failed"
**Solution**: Check Clarity syntax and Epoch compatibility

### Frontend Issues
**Problem**: "Contract not found"
**Solution**: Verify contract address and network configuration

**Problem**: "Transaction failed"
**Solution**: Check wallet balance and network connectivity

**Problem**: "Wallet connection failed"
**Solution**: Ensure Hiro Wallet is installed and unlocked

## 📈 Performance Optimization

### Contract Optimization
- Minimize contract size for lower fees
- Optimize function calls
- Use efficient data structures
- Consider gas costs for users

### Frontend Optimization
- Implement loading states
- Add transaction feedback
- Optimize image loading
- Use caching for metadata

## 🔐 Security Best Practices

### Contract Security
- Audit contract code before deployment
- Test all edge cases
- Implement proper access controls
- Monitor for vulnerabilities

### Frontend Security
- Validate all user inputs
- Implement proper error handling
- Use HTTPS for all connections
- Secure environment variables

## 📞 Support and Resources

### Documentation
- [Stacks Documentation](https://docs.stacks.co/)
- [Clarity Language Guide](https://docs.stacks.co/clarity/language-features)
- [Hiro Wallet Guide](https://www.hiro.so/wallet)

### Community
- [Stacks Discord](https://discord.gg/stacks)
- [Stacks Forum](https://forum.stacks.org/)
- [GitHub Issues](https://github.com/stacks-network)

### Tools
- [Stacks Explorer](https://explorer.stacks.org/)
- [Hiro Wallet](https://www.hiro.so/wallet)
- [Stacks CLI](https://github.com/stacks-network/stacks-cli)

## 🎯 Next Steps

1. **Test thoroughly** on testnet before mainnet
2. **Start with small deployments** to verify everything works
3. **Monitor closely** after mainnet deployment
4. **Gather user feedback** and iterate
5. **Consider additional features** based on user needs

Remember: Mainnet deployment is permanent! Take your time, test thoroughly, and ensure everything works correctly before going live.