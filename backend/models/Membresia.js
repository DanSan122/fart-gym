const mongoose = require('mongoose');

const MembresiaSchema = new mongoose.Schema({
  clienteId: String,
  tipo: String,
  fechaInicio: Date,
  fechaFin: Date,
  pagado: Number,
  total: Number,
  estado: String
});

module.exports = mongoose.model('Membresia', MembresiaSchema);
