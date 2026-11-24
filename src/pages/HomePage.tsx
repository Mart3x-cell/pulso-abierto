import React, { useEffect, useState, useCallback } from 'react';
import { Criptomoneda } from '../types/crypto';
import { obtenerCriptomonedas } from '../api/coingecko';
import { FiltroForm } from '../components/FiltroForm';
import { CriptoCard } from '../components/CriptoCard';
import { useFavoritosStore } from '../store/favoritosStore';

type Estado = 'idle' | 'carga' | 'exito' | 'error';

export function HomePage() {
  const [datos, setDatos] = useState<Criptomoneda[]>([]);
  const [estado, setEstado] = useState<Estado>('idle');
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState<'asc' | 'desc'>('desc');

  // Selector para mostrar la cantidad global de favoritos (dato derivado)
  const cantidadFavoritos = useFavoritosStore((state) => state.favoritos.length);

  const cargarDatos = useCallback(async () => {
    // Guarda para prevenir solicitudes duplicadas si ya está cargando (Consigna 3 / Tema 4)
    if (estado === 'carga') return;

    setEstado('carga');
    try {
      const res = await obtenerCriptomonedas();
      setDatos(res);
      setEstado('exito');
    } catch (error) {
      setEstado('error');
    }
  }, [estado]);

  useEffect(() => {
    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listaFiltrada = datos
    .filter((c) => c?.name?.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => (orden === 'asc' ? a.current_price - b.current_price : b.current_price - a.current_price));

  return (
    <main className="container">
      <h2>Mercado de Criptomonedas - Pulso Abierto</h2>
      
      {/* Indicador global de favoritos derivado del store */}
      <p>⭐Favoritos totales en el sistema: <strong>{cantidadFavoritos}</strong></p>

      <FiltroForm onFiltrar={(b, o) => { setBusqueda(b); setOrden(o); }} />

      {(estado === 'idle' || estado === 'carga') && (
        <p role="status">Cargando información del mercado...</p>
      )}

      {estado === 'error' && (
        <div role="alert">
          <p>Error al conectar con la API de CoinGecko.</p>
          <button onClick={cargarDatos}>
            Reintentar consulta
          </button>
        </div>
      )}

      {estado === 'exito' && (
        <>
          <p>Resultados encontrados: <strong>{listaFiltrada.length}</strong></p>
          <div className="cripto-grid">
            {listaFiltrada.map((item) => (
              <CriptoCard
                key={item.id}
                id={item.id}
                name={item.name}
                symbol={item.symbol}
                price={item.current_price}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}