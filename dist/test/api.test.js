"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_fetch_mock_1 = require("jest-fetch-mock");
jest_fetch_mock_1.default.enableMocks();
const kasplex_api_1 = require("../api/kasplex.api");
const mainnetNetwork = 'mainnet';
const testnetNetwork = 'testnet';
describe('Kasplex', () => {
    let kasplex;
    beforeEach(() => {
        jest_fetch_mock_1.default.resetMocks();
    });
    test('constructor initializes with mainnet URL', () => {
        kasplex = new kasplex_api_1.Kasplex(mainnetNetwork);
        expect(kasplex.kasplexUrl).toBe('https://api.kasplex.org');
    });
    test('constructor initializes with testnet URL', () => {
        kasplex = new kasplex_api_1.Kasplex(testnetNetwork);
        expect(kasplex.kasplexUrl).toBe('https://tn10api.kasplex.org');
    });
});
//# sourceMappingURL=api.test.js.map