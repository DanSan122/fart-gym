// tests/cliente.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server'); // Importa sin ejecutar el listen ni la conexión

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Pruebas de integración - Clientes', () => {
  it('POST /api/clientes - debería crear un nuevo cliente', async () => {
    const res = await request(app)
      .post('/api/clientes')
      .send({
        nombres: 'Test',
        apellidos: 'User',
        correo: 'test@example.com',
        telefono: 123456789,
        membresiaId: '1234567890abcdef12345678' // usa uno válido si validas ObjectId
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('GET /api/clientes - debería devolver lista de clientes', async () => {
    const res = await request(app).get('/api/clientes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
