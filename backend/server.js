// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://fart-gym.vercel.app'],
  credentials: true
}));

app.use(express.json());

// Rutas 
app.use('/api/clientes', require('./routes/cliente.routes'));
app.use('/api/membresias', require('./routes/membresia.routes'));
app.use('/api/asistencias', require('./routes/asistencia.routes'));
app.use('/api/sesiones', require('./routes/sesion.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/instructores', require('./routes/instructor.routes'));

// ⚠️ Conectar solo si no es entorno de test
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('🟢 MongoDB conectado');
      app.listen(process.env.PORT, () => {
        console.log(`🚀 Backend corriendo en http://localhost:${process.env.PORT}`);
      });
    })
    .catch(err => console.error('🔴 Error al conectar MongoDB', err));
}

module.exports = app;
