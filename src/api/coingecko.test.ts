// src/api/coingecko.test.ts
import { expect, test, vi, afterEach } from 'vitest';
import { obtenerCriptomonedas } from './coingecko';

afterEach(() => {
  vi.unstubAllGlobals();
});

test('normaliza correctamente una respuesta exitosa de la API', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [
        {
          id: 'bitcoin',
          symbol: 'btc',
          name: 'Bitcoin',
          image: 'btc.png',
          current_price: 65000,
          market_cap_rank: 1,
        },
      ],
    })
  );

  const resultado = await obtenerCriptomonedas();

  expect(resultado).toEqual([
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image: 'btc.png',
      current_price: 65000,
      market_cap: 1,
    },
  ]);
});

test('lanza un error cuando la respuesta HTTP tiene ok: false', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })
  );

  await expect(obtenerCriptomonedas()).rejects.toThrow();
});