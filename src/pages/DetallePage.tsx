import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Criptomoneda } from '../types/crypto';
import { obtenerDetalleCripto } from '../api/coingecko';
import { useFavoritosStore } from '../store/favoritosStore';

export function DetallePage() {
  const { id } = useParams<{ id: string }>();
  const cryptoId = id ?? '';

  const [cripto, setCripto] = useState<Criptomoneda | null>(null);
  const [estado, setEstado] = useState<'carga' | 'exito' | 'error'>('carga');

  // Selectores de Zustand para manejar favoritos en la vista de detalle
  const esFavorito = useFavoritosStore((state) => state.favoritos.includes(cryptoId));
  const alternarFavorito = useFavoritosStore((state) => state.alternarFavorito);

  useEffect(() => {
    if (cryptoId) {
      setEstado('carga');
      obtenerDetalleCripto(cryptoId)
        .then((res) => {
          setCripto(res);
          setEstado('exito');
        })
        .catch(() => setEstado('error'));
    }
  }, [cryptoId]);

  if (estado === 'carga') return <p role="status">Cargando detalles...</p>;
  if (estado === 'error' || !cripto) return <p role="alert">No se encontró la información solicitada.</p>;

  return (
    <main className="container">
      <Link to="/">← Volver al listado principal</Link>
      <article className="cripto-detalle">
        <img src={cripto.image} alt={cripto.name} />
        <h2>{cripto.name} ({cripto.symbol?.toUpperCase()})</h2>
        <p><strong>Precio Actual:</strong> ${cripto.current_price?.toLocaleString()}</p>
        <p><strong>Ranking de Mercado:</strong> #{cripto.market_cap}</p>

        {/* Botón de favorito sincronizado con el store global */}
        <button 
          onClick={() => alternarFavorito(cryptoId)}
          aria-label={esFavorito ? 'Quitar de favoritos' : 'Marcar favorito'}
        >
          {esFavorito ? '★ Quitar de Favoritos' : '☆ Agregar a Favoritos'}
        </button>
      </article>
    </main>
  );
}