// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';

import {
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';

import App from '../App';
import { initialProducts } from '../data/Products';


function start(
  email = 'admin@sonidovivo.cl',
  password = 'admin123'
) {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  fireEvent.change(
    screen.getByLabelText('Correo electrónico'),
    {
      target: { value: email },
    }
  );

  fireEvent.change(
    screen.getByLabelText('Contraseña'),
    {
      target: { value: password },
    }
  );

  fireEvent.click(
    screen.getByRole('button', {
      name: /entrar al sistema/i,
    })
  );
}


function go(name: string) {
  fireEvent.click(
    screen.getByRole('link', {
      name,
    })
  );
}


test(
  'carrito agrega cantidades del mismo producto y permite quitarlo',
  () => {
    start();

    go('Catálogo');


    const card = screen
      .getByRole('heading', {
        name: initialProducts[0].Nombre,
      })
      .closest('article')!;


    const addButton = within(card).getByRole('button');

    fireEvent.click(addButton);
    fireEvent.click(addButton);


    expect(
      screen.getByRole('button', {
        name: 'Abrir carrito',
      })
    ).toHaveTextContent('2');


    fireEvent.click(
      screen.getByRole('button', {
        name: 'Abrir carrito',
      })
    );


    fireEvent.click(
      screen.getByRole('button', {
        name: 'Quitar',
      })
    );


    expect(
      screen.getByRole('button', {
        name: 'Abrir carrito',
      })
    ).toHaveTextContent('0');


    expect(
      screen.getByRole('button', {
        name: 'Confirmar pedido',
      })
    ).toBeDisabled();
  }
);