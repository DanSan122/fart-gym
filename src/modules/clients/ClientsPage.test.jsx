// ✅ Configuración para Node (TextEncoder/TextDecoder)
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// ✅ Imports en formato CommonJS
const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const { BrowserRouter } = require('react-router-dom');
const ClientsPage = require('./ClientsPage.jsx').default;


// ✅ Mock del contexto
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

// ✅ Simula la variable de entorno
process.env.VITE_API_URL = 'http://localhost:5000/api';

// ✅ Simula el fetch de clientes
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            nombres: 'Daniel',
            apellidos: 'Sánchez',
            fechaNacimiento: '1995-05-10',
            telefono: '999999999',
            correo: 'daniel@example.com',
            dni: '12345678',
          },
        ]),
    })
  );
});

afterAll(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

// ✅ Helper para renderizar con router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// ✅ Tests
test('renderiza título y clientes simulados', async () => {
  renderWithRouter(<ClientsPage />);

  expect(screen.getByText('Clientes')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Daniel')).toBeInTheDocument();
    expect(screen.getByText('Sánchez')).toBeInTheDocument();
  });
});
