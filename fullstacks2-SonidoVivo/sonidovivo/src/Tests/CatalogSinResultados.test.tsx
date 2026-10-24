import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Catalog from '../pages/Catalog';
import { initialProducts } from '../data/products';

function mount() { render(<Catalog products={initialProducts} onAdd={vi.fn()} />); }
function search(value: string) {
  fireEvent.change(screen.getByPlaceholderText('Buscar producto, marca o código...'), { target: { value } });
}
test('búsqueda sin coincidencias muestra cero y ninguna tarjeta', () => {
  mount(); search('inexistente-xyz');
  expect(screen.getByText('0 producto(s) encontrados')).toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
});
