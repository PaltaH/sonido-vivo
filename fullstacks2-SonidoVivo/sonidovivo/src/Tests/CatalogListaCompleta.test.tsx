import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Catalog from '../pages/Catalog';
import { initialProducts } from '../data/Products';

function mount() { render(<Catalog products={initialProducts} onAdd={vi.fn()} />); }
function search(value: string) {
  fireEvent.change(screen.getByPlaceholderText('Buscar producto, marca o código...'), { target: { value } });
}
test('catálogo lista todos los productos recibidos', () => {
  mount(); expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(initialProducts.length);
  for (const p of initialProducts) expect(screen.getByRole('heading', { name: p.Nombre })).toBeInTheDocument();
  expect(screen.getByText(`${initialProducts.length} producto(s) encontrados`)).toBeInTheDocument();
});
