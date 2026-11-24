import React, { useState } from 'react';

interface FiltroFormProps {
  onFiltrar: (busqueda: string, orden: 'asc' | 'desc') => void;
}

export const FiltroForm: React.FC<FiltroFormProps> = ({ onFiltrar }) => {
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState<'asc' | 'desc'>('desc');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltrar(busqueda, orden);
  };

  return (
    <form onSubmit={handleSubmit} className="filtro-form">
      <input
        type="text"
        placeholder="Buscar criptomoneda..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <select value={orden} onChange={(e) => setOrden(e.target.value as 'asc' | 'desc')}>
        <option value="desc">Mayor precio</option>
        <option value="asc">Menor precio</option>
      </select>
      <button type="submit">Filtrar</button>
    </form>
  );
};