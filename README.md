# Kasplex API Library

The Kasplex API Library is a TypeScript library for interacting with the Kasplex blockchain API, allowing developers to manage KRC-20 tokens, query token information, and perform operations seamlessly.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Methods](#methods)
  - [getTokenInfo](#gettokeninfo)
  - [getTokenList](#gettokenlist)
  - [getTokenListOfAddress](#gettokenlistofaddress)
  - [getTokenBalanceOfAddress](#gettokenbalanceofaddress)
  - [getOpList](#getoplist)
  - [getOpDetails](#getopdetails)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the Kasplex API Library, run:

```bash
yarn add kasplex
```

## Usage

To use the library, import the `Kasplex` class into your TypeScript project and instantiate it with the desired network type (either `mainnet` or `testnet`).

```typescript
import { Kasplex } from 'kasplex';

const kasplex = new Kasplex('mainnet');
```

## Methods

### getTokenInfo(tick: string)

Get details of a specific KRC-20 token by its tick.

**Parameters:**

- `tick`: A string representing the token's tick.

**Returns:**

A promise that resolves to an object containing the token details.

**Example:**

```typescript
const tokenInfo = await kasplex.getTokenInfo('KASCOW');
console.log(tokenInfo);
```

### getTokenList(params?: { next?: string; prev?: string })

Retrieve a list of KRC-20 tokens with pagination.

**Parameters:**

- `params` (optional): An object containing pagination parameters.
  - `next`: The next page token.
  - `prev`: The previous page token.

**Returns:**

A promise that resolves to an object containing a list of tokens and pagination information.

**Example:**

```typescript
const tokenList = await kasplex.getTokenList();
console.log(tokenList);
```

### getTokenListOfAddress(address: string, params?: { next?: string; prev?: string })

Get a list of KRC-20 tokens held by a specific address.

**Parameters:**

- `address`: The holder address (case-insensitive).
- `params` (optional): Pagination parameters.

**Returns:**

A promise that resolves to an object containing token balances for the specified address.

**Example:**

```typescript
const addressTokens = await kasplex.getTokenListOfAddress('yourAddressHere');
console.log(addressTokens);
```

### getTokenBalanceOfAddress(address: string, tick: string)

Get the balance of a specific KRC-20 token for a given address.

**Parameters:**

- `address`: The holder address.
- `tick`: The token's tick.

**Returns:**

A promise that resolves to an object containing the token balance for the specified address.

**Example:**

```typescript
const tokenBalance = await kasplex.getTokenBalanceOfAddress('yourAddressHere', 'KASCOW');
console.log(tokenBalance);
```

### getOpList(params?: { next?: string; prev?: string; address?: string; tick?: string })

Get a list of KRC-20 operations with optional filtering.

**Parameters:**

- `params` (optional): An object containing filtering parameters.
  - `next`: The next page token.
  - `prev`: The previous page token.
  - `address`: The address to filter operations.
  - `tick`: The token tick to filter operations.

**Returns:**

A promise that resolves to an object containing a list of operations and pagination information.

**Example:**

```typescript
const operations = await kasplex.getOpList();
console.log(operations);
```

### getOpDetails(operationId: string)

Get details of a specific KRC-20 operation.

**Parameters:**

- `operationId`: The ID of the operation.

**Returns:**

A promise that resolves to an object containing the operation details.

**Example:**

```typescript
const operationDetails = await kasplex.getOpDetails('operationIdHere');
console.log(operationDetails);
```

### Example Usage of Transform Method

The `transform` method is called automatically when fetching token or operation details, so you generally do not need to call it directly.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or create an issue to discuss any features or bugs.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
