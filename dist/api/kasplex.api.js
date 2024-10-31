"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kasplex = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
/**
 * Kasplex API client for interacting with KRC-20 token information.
 */
class Kasplex {
    /**
     * Initializes a new Kasplex instance.
     * @param networkType - Network type, either 'mainnet' or 'testnet'.
     * @param apiVersion - Optional API version, default is 'v1'.
     */
    constructor(networkType, apiVersion) {
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
    getTokenInfo(tick) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.kasplexUrl}/${this.apiVersion}/krc20/token/${tick}`);
            if (!response.ok) {
                throw new Error(`HTTP_ERR: ${response.status}`);
            }
            const parsed = yield response.json();
            if (parsed.message !== 'successful') {
                throw new Error(`KASPLEX_ERR: ${parsed.message}`);
            }
            return {
                message: parsed.message,
                result: this.transform(parsed.result[0])
            };
        });
    }
    /**
     * Retrieves a list of KRC-20 tokens, with optional pagination.
     * @param params - Optional pagination parameters with `next` and `prev` tokens.
     * @returns A Promise resolving to `KasplexPagination<KasplexTokenList>`, containing the list of tokens.
     * @throws Error if the API response is unsuccessful.
     */
    getTokenList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(`${this.kasplexUrl}/${this.apiVersion}/krc20/tokenlist`);
            if (params) {
                if (params.next)
                    url.searchParams.append('next', params.next);
                if (params.prev)
                    url.searchParams.append('prev', params.prev);
            }
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP_ERR: ${response.status}`);
            }
            const parsed = yield response.json();
            if (parsed.message !== 'successful') {
                throw new Error(`KASPLEX_ERR: ${parsed.message}`);
            }
            return {
                message: parsed.message,
                result: parsed.result.map((x) => this.transform(x)),
                next: parsed.next,
                prev: parsed.prev
            };
        });
    }
    /**
     * Retrieves a paginated list of KRC-20 tokens for a specific address.
     * @param address - The address to retrieve token balances for.
     * @param params - Optional pagination parameters with `next` and `prev` tokens.
     * @returns A Promise resolving to `KasplexPagination<KasplexAddress>`, containing token balances for the address.
     * @throws Error if the API response is unsuccessful.
     */
    getTokenListOfAddress(address, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(`${this.kasplexUrl}/${this.apiVersion}/krc20/address/${address}/tokenlist`);
            if (params) {
                if (params.next)
                    url.searchParams.append('next', params.next);
                if (params.prev)
                    url.searchParams.append('prev', params.prev);
            }
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP_ERR: ${response.status}`);
            }
            const parsed = yield response.json();
            if (parsed.message !== 'successful') {
                throw new Error(`KASPLEX_ERR: ${parsed.message}`);
            }
            return {
                message: parsed.message,
                result: parsed.result.map((x) => this.transform(x)),
                next: parsed.next,
                prev: parsed.prev
            };
        });
    }
    /**
     * Retrieves the balance of a specific KRC-20 token for a given address.
     * @param address - The address to retrieve the token balance for.
     * @param tick - The ticker symbol of the token.
     * @returns A Promise resolving to `TickWrapper<KasplexAddress>`, containing token balance details.
     * @throws Error if the API response is unsuccessful.
     */
    getTokenBalanceOfAddress(address, tick) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.kasplexUrl}/${this.apiVersion}/krc20/address/${address}/token/${tick}`);
            if (!response.ok) {
                throw new Error(`HTTP_ERR: ${response.status}`);
            }
            const parsed = yield response.json();
            if (parsed.message !== 'successful') {
                throw new Error(`KASPLEX_ERR: ${parsed.message}`);
            }
            return {
                message: parsed.message,
                result: this.transform(parsed.result[0])
            };
        });
    }
    /**
     * Retrieves a list of KRC-20 operations with optional filters.
     * @param params - Optional parameters for pagination and filtering by address and token ticker.
     * @returns A Promise resolving to `KasplexPagination<KasplexOperation>`, containing the list of operations.
     * @throws Error if the API response is unsuccessful.
     */
    getOpList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(`${this.kasplexUrl}/${this.apiVersion}/krc20/oplist`);
            if (params) {
                if (params.next)
                    url.searchParams.append('next', params.next);
                if (params.prev)
                    url.searchParams.append('prev', params.prev);
                if (params.address)
                    url.searchParams.append('address', params.address);
                if (params.tick)
                    url.searchParams.append('tick', params.tick);
            }
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP_ERR: ${response.status}`);
            }
            const parsed = yield response.json();
            if (parsed.message !== 'successful') {
                throw new Error(`KASPLEX_ERR: ${parsed.message}`);
            }
            return {
                message: parsed.message,
                result: parsed.result.map((x) => this.transform(x)),
                next: parsed.next,
                prev: parsed.prev
            };
        });
    }
    /**
     * Retrieves details of a specific KRC-20 operation by operation ID.
     * @param operationId - The unique identifier of the operation.
     * @returns A Promise resolving to `TickWrapper<KasplexOperation>`, containing operation details.
     * @throws Error if the API response is unsuccessful.
     */
    getOpDetails(operationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.kasplexUrl}/${this.apiVersion}/krc20/op/${operationId}`);
            if (!response.ok) {
                throw new Error(`HTTP_ERR: ${response.status}`);
            }
            const parsed = yield response.json();
            if (parsed.message !== 'successful') {
                throw new Error(`KASPLEX_ERR: ${parsed.message}`);
            }
            return {
                message: parsed.message,
                result: this.transform(parsed.result[0])
            };
        });
    }
    /**
     * Transforms numerical values within the object to readable decimal format.
     * @param object - The object containing numerical properties to transform.
     * @returns A new object with transformed values.
     * @throws Error if the input object is empty.
     * @private
     */
    transform(object) {
        if (!object) {
            throw new Error(`ERR: cannot transform empty object`);
        }
        const keysToTransform = ['max', 'lim', 'pre', 'minted', 'balance', 'locked', 'amt'];
        const obj = {};
        // Iterate through each key in the input object
        Object.keys(object).forEach((key) => {
            obj[key] = object[key];
            // Transform specific keys with Decimal division if they exist in keysToTransform
            if (keysToTransform.includes(key)) {
                obj[key] = new decimal_js_1.default(object[key]).div(new decimal_js_1.default(10).pow(new decimal_js_1.default(object.dec)));
            }
        });
        if ('holder' in object && Array.isArray(object.holder)) {
            obj.holder = object.holder.map((holderItem) => (Object.assign(Object.assign({}, holderItem), { amount: new decimal_js_1.default(holderItem.amount).div(new decimal_js_1.default(10).pow(new decimal_js_1.default(object.dec))) })));
        }
        return obj;
    }
}
exports.Kasplex = Kasplex;
