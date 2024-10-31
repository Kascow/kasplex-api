import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import { Kasplex } from '../api/kasplex.api';

const mainnetNetwork = 'mainnet';
const testnetNetwork = 'testnet';

describe('Kasplex', () => {
  let kasplex: Kasplex;

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('constructor initializes with mainnet URL', () => {
    kasplex = new Kasplex(mainnetNetwork);
    expect(kasplex.kasplexUrl).toBe('https://api.kasplex.org');
  });

  test('constructor initializes with testnet URL', () => {
    kasplex = new Kasplex(testnetNetwork);
    expect(kasplex.kasplexUrl).toBe('https://tn10api.kasplex.org');
  });
});
