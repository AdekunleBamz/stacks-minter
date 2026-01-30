# Contributing to Stacks NFT Minter

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/stacks-minter.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Clarinet (for smart contract development)

### Running Locally
```bash
npm install
npm run dev
```

### Smart Contract Development
```bash
clarinet check
clarinet test
```

## Code Style

- Use ESLint and Prettier for code formatting
- Follow React best practices
- Write meaningful commit messages
- Add tests for new features

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update documentation for any new features
3. Ensure all tests pass
4. Request review from maintainers

## Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow

## Questions?

Open an issue or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
