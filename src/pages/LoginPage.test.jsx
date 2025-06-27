import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

// Mock del contexto AuthContext
jest.mock('../config', () => ({
  BASE_URL: 'http://localhost:5000/api'
}));



// Mock de fetch (para evitar error aunque no se use)
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ mensaje: 'ok' })
  })
);

describe('LoginPage', () => {
  test('renderiza campos y botón', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument();
  });

  test('muestra alerta si se hace submit sin llenar los campos', () => {
    window.alert = jest.fn();

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const boton = screen.getByRole('button', { name: /Ingresar/i });
    fireEvent.click(boton);

    expect(window.alert).toHaveBeenCalledWith('Por favor, completa todos los campos');
  });
});
