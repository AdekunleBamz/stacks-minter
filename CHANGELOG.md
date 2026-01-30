# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial NFT minter application setup
- SIP-009 compliant smart contract (stacks-nft-v2.clar)
- Wallet connection support via Stacks Connect
- NFT minting functionality
- Dashboard component for NFT management
- Dark mode support
- Network switching (mainnet/testnet)

### UI Components
- Button, Card, Modal, Input components
- Alert with multiple variants
- Tabs (horizontal and vertical)
- Select dropdown
- Switch/Toggle
- Skeleton loading states
- Progress indicator
- Toast notifications
- Tooltip component
- Avatar component
- Badge component
- LoadingSpinner

### Feature Components
- WalletConnect - Stacks wallet integration
- NFTMinter - Minting interface
- NFTGallery - Display owned NFTs
- TransactionHistory - View past transactions
- NetworkSwitcher - Toggle between networks
- Header and Footer
- ErrorBoundary - Error handling
- CopyButton - Copy to clipboard
- StatsCard - Display statistics

### Hooks
- useStacks - Stacks blockchain interactions
- useLocalStorage - Persistent state
- useDebounce / useThrottle - Performance optimization
- useClickOutside / useEscapeKey - UI interactions
- useAsync / usePolling - Async state management

### Utilities
- Stacks helper functions
- Formatting utilities (STX, addresses, dates)
- Validation utilities
- Storage utilities

### Configuration
- ESLint and Prettier setup
- Tailwind CSS configuration
- Vite build configuration
- GitHub Actions CI workflow
- Dependabot configuration

### Documentation
- README with setup instructions
- API documentation
- Architecture documentation
- Contributing guidelines
- Security policy
- Code of conduct
- Deployment checklist

## [1.0.0] - TBD

### Added
- Production deployment to Stacks mainnet
- Contract: SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N.stacks-nft-v2

---

## Version History

### Planned Features
- [ ] NFT metadata IPFS integration
- [ ] Batch minting support
- [ ] Secondary marketplace integration
- [ ] NFT transfer functionality
- [ ] Collection management
- [ ] Analytics dashboard

### Known Issues
- None currently documented

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute to this project.
