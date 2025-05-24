const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
  nombre: String,
  especialidad: String,
  // otros campos que tengas
}, {
  collection: 'instructores' // nombre de tu colección real
});

module.exports = mongoose.model("Instructor", InstructorSchema);
