// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';

import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import { expect, test, vi } from 'vitest';

import Button from '../components/atoms/Button';


test(
  'Button transmite texto, tipo, clase y evento',
  () => {
    const click = vi.fn();


    render(
      <Button
        type="button"
        className="secondary"
        onClick={click}
      >
        Guardar
      </Button>
    );


    const button = screen.getByRole(
      'button',
      {
        name: 'Guardar',
      }
    );


    expect(
      button
    ).toHaveAttribute(
      'type',
      'button'
    );


    expect(
      button
    ).toHaveClass(
      'button',
      'secondary'
    );


    fireEvent.click(
      button
    );


    expect(
      click
    ).toHaveBeenCalledTimes(1);
  }
);
