const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  correo: String,
  telefono: Number,
  dni: Number,
  fechaNacimiento: Date,
  direccion: String,
  estado: Boolean
});


module.exports = mongoose.model('Cliente', ClienteSchema);
