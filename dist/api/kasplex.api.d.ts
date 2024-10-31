import { KasplexAddress, KasplexOperation, KasplexPagination, KasplexToken, KasplexTokenList, TickWrapper } from './kasplex.interface';
export declare class Kasplex {
    kasplexUrl: string;
    apiVersion: string;
    constructor(networkType: 'mainnet' | 'testnet', apiVersion?: string);
    getTokenInfo(tick: string): Promise<TickWrapper<KasplexToken>>;
    getTokenList(params?: {
        next?: string;
        prev?: string;
    }): Promise<KasplexPagination<KasplexTokenList>>;
    getTokenListOfAddress(address: string, params?: {
        next?: string;
        prev?: string;
    }): Promise<KasplexPagination<KasplexAddress>>;
    getTokenBalanceOfAddress(address: string, tick: string): Promise<TickWrapper<KasplexAddress>>;
    getOpList(params?: {
        next?: string;
        prev?: string;
        address?: string;
        tick?: string;
    }): Promise<KasplexPagination<KasplexOperation>>;
    getOpDetails(operationId: string): Promise<TickWrapper<KasplexOperation>>;
    private transform;
}
