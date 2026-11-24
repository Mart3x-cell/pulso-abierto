import { Criptomoneda } from '../types/crypto';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

interface CoinMarketItem {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
}

interface CoinDetailResponse {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
  };
  market_cap_rank: number;
}

async function fetchJson<T>(url: string, errorMessage: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(errorMessage);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtenerCriptomonedas(): Promise<Criptomoneda[]> {
  const url = `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
  const data = await fetchJson<CoinMarketItem[]>(url, 'Error al obtener los datos');

  return data.map((item) => ({
    id: item.id,
    symbol: item.symbol,
    name: item.name,
    image: item.image,
    current_price: item.current_price,
    market_cap: item.market_cap_rank,
  }));
}

export async function obtenerDetalleCripto(id: string): Promise<Criptomoneda> {
  const url = `${COINGECKO_BASE_URL}/coins/${id}`;
  const data = await fetchJson<CoinDetailResponse>(url, 'Error al obtener el detalle');

  return {
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    image: data.image.large,
    current_price: data.market_data.current_price.usd,
    market_cap: data.market_cap_rank,
  };
}