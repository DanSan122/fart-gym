const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  clienteId: String,
  sesionId: String,
  fechaReserva: Date
});

module.exports = mongoose.model('Reserva', ReservaSchema);
