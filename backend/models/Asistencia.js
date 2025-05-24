const mongoose = require('mongoose');

const AsistenciaSchema = new mongoose.Schema({
  clienteId: String,
  fecha: Date,
  asistio: Boolean
});

module.exports = mongoose.model('Asistencia', AsistenciaSchema);
