import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import App from '../App';
import Orders from '../pages/Orders';
import { initialProducts } from '../data/products';
import { initialUsers } from '../data/Usuarios';

function start(email = 'admin@sonidovivo.cl', password = 'admin123') {
  render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: email } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: password } });
  fireEvent.click(screen.getByRole('button', { name: /entrar al sistema/i }));
}
function go(name: string) { fireEvent.click(screen.getByRole('link', { name })); }

test('seguimiento muestra resultado únicamente después de consultar y normaliza código', () => {
  render(<Orders />); expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText('Ej. SV-8041'), { target: { value: '  sv-8041  ' } });
  expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /consultar estado/i }));
  expect(screen.getByRole('heading', { name: 'Pedido: SV-8041' })).toBeInTheDocument();
  expect(screen.getByText(/Estado de demostración: En preparación/)).toBeInTheDocument();
});

