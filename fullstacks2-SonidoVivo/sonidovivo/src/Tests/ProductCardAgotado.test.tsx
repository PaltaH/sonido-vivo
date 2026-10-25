import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import ProductCard from '../components/molecules/ProductCard';
import { initialProducts } from '../data/Products';

test('ProductCard agotado impide agregar al carrito', () => {
  const add = vi.fn(); render(<ProductCard product={{ ...initialProducts[0], Stock: 0 }} onAdd={add} />);
  expect(screen.getByText('Agotado')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeDisabled(); fireEvent.click(screen.getByRole('button'));
  expect(add).not.toHaveBeenCalled();
});
