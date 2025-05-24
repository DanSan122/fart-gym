const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true }
});

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
