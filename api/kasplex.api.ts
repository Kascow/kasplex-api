import Decimal from 'decimal.js';
import {
  KasplexAddress,
  KasplexOperation,
  KasplexPagination,
  KasplexToken,
  KasplexTokenList,
  TickWrapper
} from './kasplex.interface';

/**
 * Kasplex API client for interacting with KRC-20 token information.
 */
export class Kasplex {
  kasplexUrl: string;
  apiVersion: string;

  /**
   * Initializes a new Kasplex instance.
   * @param networkType - Network type, either 'mainnet' or 'testnet'.
   * @param apiVersion - Optional API version, default is 'v1'.
   */
  constructor(networkType: 'mainnet' | 'testnet', apiVersion?: string) {
    this.kasplexUrl =
      networkType === 'mainnet'
        ? 'https://api.kasplex.org'
        : 'https://tn10api.kasplex.org';
    this.apiVersion = apiVersion ? apiVersion : 'v1';
  }

  /**
   * Retrieves details of a specific KRC-20 token by its ticker symbol.
   * @param tick - The ticker symbol of the token.
   * @returns A Promise resolving to `TickWrapper<KasplexToken>`, containing token details.
   * @throws Error if the API response is unsuccessful.
   */
  async getTokenInfo(tick: string): Promise<TickWrapper<KasplexToken>> {
    const response = await fetch(
      `${this.kasplexUrl}/${this.apiVersion}/krc20/token/${tick}`
    );

    if (!response.ok) {
      throw new Error(`HTTP_ERR: ${response.status}`);
    }

    const parsed: TickWrapper<KasplexToken[]> = await response.json();

    if (parsed.message !== 'successful') {
      throw new Error(`KASPLEX_ERR: ${parsed.message}`);
    }

    return {
      message: parsed.message,
      result: this.transform(parsed.result[0]) as KasplexToken
    };
  }

  /**
   * Retrieves a list of KRC-20 tokens, with optional pagination.
   * @param params - Optional pagination parameters with `next` and `prev` tokens.
   * @returns A Promise resolving to `KasplexPagination<KasplexTokenList>`, containing the list of tokens.
   * @throws Error if the API response is unsuccessful.
   */
  async getTokenList(params?: {
    next?: string;
    prev?: string;
  }): Promise<KasplexPagination<KasplexTokenList>> {
    const url = new URL(`${this.kasplexUrl}/${this.apiVersion}/krc20/tokenlist`);

    if (params) {
      if (params.next) url.searchParams.append('next', params.next);
      if (params.prev) url.searchParams.append('prev', params.prev);
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP_ERR: ${response.status}`);
    }

    const parsed: KasplexPagination<KasplexTokenList> = await response.json();

    if (parsed.message !== 'successful') {
      throw new Error(`KASPLEX_ERR: ${parsed.message}`);
    }

    return {
      message: parsed.message,
      result: parsed.result.map((x) => this.transform(x)) as KasplexTokenList[],
      next: parsed.next,
      prev: parsed.prev
    };
  }

  /**
   * Retrieves a paginated list of KRC-20 tokens for a specific address.
   * @param address - The address to retrieve token balances for.
   * @param params - Optional pagination parameters with `next` and `prev` tokens.
   * @returns A Promise resolving to `KasplexPagination<KasplexAddress>`, containing token balances for the address.
   * @throws Error if the API response is unsuccessful.
   */
  async getTokenListOfAddress(
    address: string,
    params?: { next?: string; prev?: string }
  ): Promise<KasplexPagination<KasplexAddress>> {
    const url = new URL(
      `${this.kasplexUrl}/${this.apiVersion}/krc20/address/${address}/tokenlist`
    );

    if (params) {
      if (params.next) url.searchParams.append('next', params.next);
      if (params.prev) url.searchParams.append('prev', params.prev);
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP_ERR: ${response.status}`);
    }

    const parsed: KasplexPagination<KasplexAddress> = await response.json();

    if (parsed.message !== 'successful') {
      throw new Error(`KASPLEX_ERR: ${parsed.message}`);
    }

    return {
      message: parsed.message,
      result: parsed.result.map((x) => this.transform(x)) as KasplexAddress[],
      next: parsed.next,
      prev: parsed.prev
    };
  }

  /**
   * Retrieves the balance of a specific KRC-20 token for a given address.
   * @param address - The address to retrieve the token balance for.
   * @param tick - The ticker symbol of the token.
   * @returns A Promise resolving to `TickWrapper<KasplexAddress>`, containing token balance details.
   * @throws Error if the API response is unsuccessful.
   */
  async getTokenBalanceOfAddress(
    address: string,
    tick: string
  ): Promise<TickWrapper<KasplexAddress>> {
    const response = await fetch(
      `${this.kasplexUrl}/${this.apiVersion}/krc20/address/${address}/token/${tick}`
    );

    if (!response.ok) {
      throw new Error(`HTTP_ERR: ${response.status}`);
    }

    const parsed: TickWrapper<KasplexAddress[]> = await response.json();

    if (parsed.message !== 'successful') {
      throw new Error(`KASPLEX_ERR: ${parsed.message}`);
    }

    return {
      message: parsed.message,
      result: this.transform(parsed.result[0]) as KasplexAddress
    };
  }

  /**
   * Retrieves a list of KRC-20 operations with optional filters.
   * @param params - Optional parameters for pagination and filtering by address and token ticker.
   * @returns A Promise resolving to `KasplexPagination<KasplexOperation>`, containing the list of operations.
   * @throws Error if the API response is unsuccessful.
   */
  async getOpList(params?: {
    next?: string;
    prev?: string;
    address?: string;
    tick?: string;
  }): Promise<KasplexPagination<KasplexOperation>> {
    const url = new URL(`${this.kasplexUrl}/${this.apiVersion}/krc20/oplist`);

    if (params) {
      if (params.next) url.searchParams.append('next', params.next);
      if (params.prev) url.searchParams.append('prev', params.prev);
      if (params.address) url.searchParams.append('address', params.address);
      if (params.tick) url.searchParams.append('tick', params.tick);
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP_ERR: ${response.status}`);
    }

    const parsed: KasplexPagination<KasplexOperation> = await response.json();

    if (parsed.message !== 'successful') {
      throw new Error(`KASPLEX_ERR: ${parsed.message}`);
    }

    return {
      message: parsed.message,
      result: parsed.result.map((x) => this.transform(x)) as KasplexOperation[],
      next: parsed.next,
      prev: parsed.prev
    };
  }

  /**
   * Retrieves details of a specific KRC-20 operation by operation ID.
   * @param operationId - The unique identifier of the operation.
   * @returns A Promise resolving to `TickWrapper<KasplexOperation>`, containing operation details.
   * @throws Error if the API response is unsuccessful.
   */
  async getOpDetails(operationId: string): Promise<TickWrapper<KasplexOperation>> {
    const response = await fetch(
      `${this.kasplexUrl}/${this.apiVersion}/krc20/op/${operationId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP_ERR: ${response.status}`);
    }

    const parsed: TickWrapper<KasplexOperation[]> = await response.json();

    if (parsed.message !== 'successful') {
      throw new Error(`KASPLEX_ERR: ${parsed.message}`);
    }

    return {
      message: parsed.message,
      result: this.transform(parsed.result[0]) as KasplexOperation
    };
  }

  /**
   * Transforms numerical values within the object to readable decimal format.
   * @param object - The object containing numerical properties to transform.
   * @returns A new object with transformed values.
   * @throws Error if the input object is empty.
   * @private
   */
  private transform(
    object: KasplexOperation | KasplexAddress | KasplexTokenList | KasplexToken
  ): any {
    if (!object) {
      throw new Error(`ERR: cannot transform empty object`);
    }

    const keysToTransform = ['max', 'lim', 'pre', 'minted', 'balance', 'locked', 'amt'];

    const obj: any = {};

    // Iterate through each key in the input object
    Object.keys(object).forEach((key) => {
      obj[key] = (object as any)[key];

      // Transform specific keys with Decimal division if they exist in keysToTransform
      if (keysToTransform.includes(key)) {
        obj[key] = new Decimal((object as any)[key]).div(
          new Decimal(10).pow(new Decimal(object.dec))
        );
      }
    });

    if ('holder' in object && Array.isArray(object.holder)) {
      obj.holder = object.holder.map((holderItem) => ({
        ...holderItem,
        amount: new Decimal(holderItem.amount).div(
          new Decimal(10).pow(new Decimal(object.dec))
        )
      }));
    }

    return obj;
  }
}
