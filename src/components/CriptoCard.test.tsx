// src/components/CriptoCard.test.tsx
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { expect, test, beforeEach } from 'vitest';
import { CriptoCard } from './CriptoCard';
import { useFavoritosStore } from '../store/favoritosStore';

beforeEach(() => {
  useFavoritosStore.setState({ favoritos: [] });
});

test('marca y desmarca una criptomoneda como favorita al hacer clic', async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <CriptoCard
        id="bitcoin"
        name="Bitcoin"
        symbol="btc"
        price={60000}
      />
    </MemoryRouter>
  );

  const boton = screen.getByRole('button', { name: /marcar favorito/i });
  expect(boton).toBeInTheDocument();

  await user.click(boton);

  expect(screen.getByRole('button', { name: /quitar de favoritos/i })).toBeInTheDocument();
});