### NEAR Protocol TypeScript Smart Contract

This repository contains a TypeScript smart contract designed to run on the NEAR Protocol blockchain. The smart contract is implemented in TypeScript using the NEAR SDK.

### Getting Started

#### 1. Clone the Repository

```bash
$: git clone https://https://github.com/frdomovic/e-voting-frontend
```

#### 2. Install dependencies

```bash
$: yarn install
```

#### 2. Add Environment variables to .env

```bash
NEXT_PUBLIC_NEAR_CONTRACT_ID=""
NEXT_PUBLIC_RELAYER_ADDRESS=""
```

1. NEXT_PUBLIC_NEAR_CONTRACT_ID - NEAR accountId where the voting smart contract is deployed (e.g. voting-contract.testnet)
2. NEXT_PUBLIC_RELAYER_ADDRESS - URL of Relayer server (e.g. http://localhost:30303)

#### 4. Start NextJS frontend

```bash
$: yarn dev
```
