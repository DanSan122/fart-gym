const mongoose = require('mongoose');

const SesionClaseSchema = new mongoose.Schema({
  plantillaId: String, // ID de la plantilla de clase
  instructorId: String,
  inicio: Date,
  fin: Date
});

module.exports = mongoose.model('SesionClase', SesionClaseSchema);
