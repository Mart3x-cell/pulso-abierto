// src/store/favoritosStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavoritosStore = {
  favoritos: string[];
  alternarFavorito: (id: string) => void;
};

export const useFavoritosStore = create<FavoritosStore>()(
  persist(
    (set) => ({
      favoritos: [],
      alternarFavorito: (id) =>
        set((estado) => ({
          favoritos: estado.favoritos.includes(id)
            ? estado.favoritos.filter((favoritoId) => favoritoId !== id)
            : [...estado.favoritos, id],
        })),
    }),
    {
      name: 'pulso-abierto-favoritos',
    }
  )
);