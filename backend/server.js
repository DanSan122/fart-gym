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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('🟢 MongoDB conectado'))
.catch(err => console.error('🔴 Error al conectar MongoDB', err));

// Rutas 
//ruta clientes
const clienteRoutes = require('./routes/cliente.routes');
app.use('/api/clientes', clienteRoutes);

//ruta membresias
const membresiaRoutes = require('./routes/membresia.routes');
app.use('/api/membresias', membresiaRoutes);

//ruta asistencia
const asistenciaRoutes = require('./routes/asistencia.routes');
app.use('/api/asistencias', asistenciaRoutes);

//ruta clases
//const claseRoutes = require('./routes/clase.routes');
//app.use('/api/clases', claseRoutes);

// ruta sesiones
const sesionRoutes = require('./routes/sesion.routes');
app.use('/api/sesiones', sesionRoutes);

//ruta usuarios
const usuarioRoutes = require('./routes/usuario.routes');
app.use('/api/usuarios', usuarioRoutes);

//instructores
const instructorRoutes = require('./routes/instructor.routes');
app.use('/api/instructores', instructorRoutes);


app.listen(process.env.PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${process.env.PORT}`);
  
}


);
