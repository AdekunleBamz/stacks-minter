# Stacks NFT Minter

A complete NFT minting application built on the Stacks blockchain, optimized for the Stacks competition. Users can mint NFTs for just 0.1 STX each with a beautiful, modern interface.

## 🚀 Features

- **Low Cost Minting**: Only 0.1 STX per NFT
- **Multiple Minting**: Mint up to 100 NFTs at once
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Stacks Integration**: Full integration with @stacks/connect and @stacks/transactions
- **Clarity 4 Compatible**: Smart contract built with Clarity 4 Epoch 3.3
- **Mainnet Ready**: Configured for Stacks mainnet deployment

## 🏗️ Architecture

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for modern styling
- **React Router** for navigation
- **@stacks/connect** for wallet integration
- **@stacks/transactions** for blockchain interactions

### Smart Contract
- **Clarity 4** with Epoch 3.3 compatibility
- **ERC-721 Style** NFT implementation
- **STX Payment** integration
- **Admin Controls** for contract management

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stacks-nft-minter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🎯 Usage

### For Users
1. Connect your Stacks wallet
2. Choose the number of NFTs to mint (1-100)
3. Confirm the transaction in your wallet
4. Pay 0.1 STX per NFT
5. Receive your unique NFTs!

### For Developers

#### Running Tests
```bash
npm test
```

#### Building for Production
```bash
npm run build
```

#### Linting
```bash
npm run lint
```

#### Formatting
```bash
npm run format
```

## 🚀 Deployment

### Contract Deployment

1. **Set environment variables**
   ```bash
   export STACKS_PRIVATE_KEY=your-private-key-here
   export STACKS_NETWORK=mainnet
   ```

2. **Deploy contract**
   ```bash
   node scripts/deploy-contract.js
   ```

3. **Update frontend configuration**
   - Update contract address in `.env.local`
   - Update contract name if changed

### Frontend Deployment

The application is built to be easily deployable to any static hosting service:

- **Vercel**: `vercel`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: `npm run build` then deploy `dist/` folder

## 📊 Smart Contract Details

### Contract Functions

#### Public Functions
- `mint-nft(amount: uint)` - Mint new NFTs (0.1 STX each)
- `transfer-nft(token-id: uint, to: principal)` - Transfer NFT ownership
- `burn-nft(token-id: uint)` - Burn an NFT (owner only)

#### Read-Only Functions
- `get-total-supply()` - Get total minted NFTs
- `get-max-supply()` - Get maximum supply (10,000)
- `get-owner-of(token-id: uint)` - Get NFT owner
- `get-token-uri(token-id: uint)` - Get NFT metadata URI
- `get-collection-info()` - Get collection metadata

#### Admin Functions
- `set-admin(new-admin: principal)` - Change contract admin
- `withdraw-stx(amount: uint)` - Withdraw STX (admin only)
- `set-base-uri(new-uri: string)` - Update metadata base URI
- `set-image-uri(new-uri: string)` - Update image base URI

### Contract Configuration
- **Max Supply**: 10,000 NFTs
- **Mint Price**: 0.1 STX per NFT
- **Network**: Stacks Mainnet
- **Epoch**: 3.3 (Clarity 4)

## 🧪 Testing

### Contract Testing
```bash
# Test on testnet first
node scripts/test-contract.js
```

### Frontend Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```bash
REACT_APP_NETWORK=mainnet
REACT_APP_STACKS_API_URL=https://stacks-node-api.mainnet.stacks.co
REACT_APP_CONTRACT_ADDRESS=your-contract-address
REACT_APP_CONTRACT_NAME=your-contract-name
```

#### Backend Scripts
```bash
STACKS_PRIVATE_KEY=your-private-key
STACKS_NETWORK=mainnet|testnet
```

## 📈 Competition Optimization

This project is optimized for the Stacks competition with:

- ✅ **Smart Contract Activity**: Full NFT minting functionality
- ✅ **@stacks/connect Usage**: Complete wallet integration
- ✅ **@stacks/transactions Usage**: All blockchain interactions
- ✅ **GitHub Contributions**: Well-structured, documented codebase
- ✅ **Mainnet Deployment**: Ready for production use

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run linting and formatting
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

Built with ❤️ for the Stacks competition using:
- [Stacks Blockchain](https://stacks.io)
- [Clarity Smart Contracts](https://clarity-lang.org)
- [React Ecosystem](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com)

## 📞 Support

For support and questions:
- Create an issue in this repository
- Join the Stacks Discord community
- Visit the Stacks documentation