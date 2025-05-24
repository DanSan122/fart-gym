const mongoose = require("mongoose");

const PlantillaSchema = new mongoose.Schema({
  clase: String, // ejemplo: 'Duo', 'Kickboxing'
  capacidad: Number
}, {
  collection: 'plantillas_clase'
});

module.exports = mongoose.model("Plantilla", PlantillaSchema);
