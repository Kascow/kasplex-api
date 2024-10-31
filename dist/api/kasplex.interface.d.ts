export type TickWrapper<T> = {
    message: string;
    result: T;
};
export type KasplexToken = {
    tick: string;
    max: string;
    lim: string;
    pre: string;
    to: string;
    dec: string;
    minted: string;
    opScoreAdd: string;
    opScoreMod: string;
    state: string;
    hashRev: string;
    mtsAdd: string;
    holderTotal: string;
    transferTotal: string;
    mintTotal: string;
    holder: Array<{
        address: string;
        amount: string;
    }>;
};
export type KasplexPagination<T> = {
    message: string;
    prev: string;
    next: string;
    result: T[];
};
export type KasplexTokenList = {
    tick: string;
    max: string;
    lim: string;
    pre: string;
    to: string;
    dec: string;
    minted: string;
    opScoreAdd: string;
    opScoreMod: string;
    state: 'deployed' | 'finished';
    hashRev: string;
    mtsAdd: string;
};
export type KasplexAddress = {
    tick: string;
    balance: string;
    locked: string;
    dec: string;
    opScoreMod: string;
};
export type KasplexOperation = {
    p: 'KRC-20';
    op: string;
    tick: string;
    max: string;
    lim: string;
    dec: string;
    pre: string;
    amt: string;
    from: string;
    to: string;
    opScore: string;
    hashRev: string;
    feeRev: string;
    txAccept: string;
    opAccept: string;
    opError: string;
    mtsAdd: string;
    mtsMod: string;
};
