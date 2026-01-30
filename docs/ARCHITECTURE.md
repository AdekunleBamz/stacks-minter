# Architecture Overview

## Project Structure

```
stacks-nft-minter/
├── contracts/           # Clarity smart contracts
│   └── stacks-nft-v2.clar
├── src/
│   ├── components/      # React components
│   │   ├── ui/          # Reusable UI components
│   │   └── *.jsx        # Feature components
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API service layer
│   ├── utils/           # Utility functions
│   ├── config/          # Configuration files
│   └── test/            # Test utilities
├── docs/                # Documentation
├── deployments/         # Deployment configurations
└── settings/            # Environment settings
```

## Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS
- **@stacks/connect** - Wallet connection
- **@stacks/transactions** - Transaction building

### Smart Contracts
- **Clarity** - Smart contract language
- **Clarinet** - Development and testing

### APIs
- **Hiro API** - Stacks blockchain data

## Data Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   User       │────▶│   Frontend   │────▶│   Wallet     │
│   Action     │     │   (React)    │     │   (Leather)  │
└──────────────┘     └──────────────┘     └──────────────┘
                            │                     │
                            ▼                     ▼
                     ┌──────────────┐     ┌──────────────┐
                     │   Hiro API   │     │   Stacks     │
                     │   (Read)     │     │   Blockchain │
                     └──────────────┘     └──────────────┘
```

## State Management

1. **React Context** - Global state (wallet, network)
2. **Local State** - Component-specific state
3. **localStorage** - Persisted preferences

## Security Considerations

- Private keys never leave the wallet
- All transactions require user confirmation
- Contract interactions use post-conditions
- No sensitive data in frontend code

## Performance Optimizations

- Code splitting with React.lazy
- Memoization for expensive computations
- Debounced API calls
- Image lazy loading

## Deployment

1. Build: `npm run build`
2. Contract: Deploy via Clarinet
3. Frontend: Static hosting (Vercel, Netlify)
