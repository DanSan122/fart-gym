const mongoose = require("mongoose");

const SesionSchema = new mongoose.Schema({
  plantillaId: String,
  instructorId: String,
  inicio: Date,
  fin: Date,
  estado: String,
}, {
  collection: 'sesiones_clase' // Nombre exacto de la colección en MongoDB
});

module.exports = mongoose.model("Sesion", SesionSchema);
