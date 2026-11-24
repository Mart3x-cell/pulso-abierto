import { Link } from 'react-router-dom';
import { useFavoritosStore } from '../store/favoritosStore';

interface CriptoCardProps {
  id: string;
  name: string;
  symbol: string;
  price: number;
}

export function CriptoCard({ id, name, symbol, price }: CriptoCardProps) {
  const esFavorito = useFavoritosStore((state) => state.favoritos.includes(id));
  const alternarFavorito = useFavoritosStore((state) => state.alternarFavorito);

  return (
    <div className="cripto-card">
      <h3>
        <Link to={`/criptomonedas/${id}`}>
          {name} ({symbol.toUpperCase()})
        </Link>
      </h3>
      <p>Precio: ${price} USD</p>

      <button
        onClick={() => alternarFavorito(id)}
        aria-label={esFavorito ? 'Quitar de favoritos' : 'Marcar favorito'}
      >
        {esFavorito ? '★ Favorito' : '☆ Marcar favorito'}
      </button>
    </div>
  );
}