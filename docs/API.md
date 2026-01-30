# API Documentation

## Smart Contract API

### Contract Information
- **Contract Address**: `SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N`
- **Contract Name**: `stacks-nft-v2`
- **Network**: Stacks Mainnet

### Public Functions

#### `mint`
Mints a new NFT to the caller's address.

**Parameters**: None

**Returns**: `(response uint uint)` - Token ID on success, error code on failure

**Cost**: 0.1 STX + transaction fee (~0.005 STX)

**Example**:
```clarity
(contract-call? .stacks-nft-v2 mint)
```

#### `transfer`
Transfers an NFT from one address to another.

**Parameters**:
- `token-id`: `uint` - The ID of the token to transfer
- `sender`: `principal` - Current owner of the NFT
- `recipient`: `principal` - New owner of the NFT

**Returns**: `(response bool uint)`

#### `get-owner`
Returns the owner of a specific token.

**Parameters**:
- `token-id`: `uint` - The token ID to query

**Returns**: `(optional principal)`

#### `get-last-token-id`
Returns the ID of the most recently minted token.

**Returns**: `(response uint uint)`

### Read-Only Functions

#### `get-token-uri`
Returns the metadata URI for a token.

**Parameters**:
- `token-id`: `uint`

**Returns**: `(optional (string-ascii 256))`

## Frontend API Service

### Account API

```javascript
import { accountApi } from '@/services/stacksApi';

// Get STX balance
const balance = await accountApi.getBalance('SP...');

// Get account nonces
const nonces = await accountApi.getNonces('SP...');
```

### Transaction API

```javascript
import { transactionApi } from '@/services/stacksApi';

// Get transaction details
const tx = await transactionApi.getTransaction('0x...');

// Get address transactions
const txs = await transactionApi.getAddressTransactions('SP...');
```

### NFT API

```javascript
import { nftApi } from '@/services/stacksApi';

// Get NFT holdings
const holdings = await nftApi.getHoldings('SP...');

// Get NFT metadata
const metadata = await nftApi.getMetadata('SP...contract', 1);
```

## Error Codes

| Code | Description |
|------|-------------|
| `u1` | Not authorized |
| `u2` | Token not found |
| `u3` | Max supply reached |
| `u4` | Insufficient balance |

## Rate Limits

The Hiro API has the following rate limits:
- **Free tier**: 50 requests/minute
- **Pro tier**: 500 requests/minute

Implement exponential backoff for rate limit errors.
