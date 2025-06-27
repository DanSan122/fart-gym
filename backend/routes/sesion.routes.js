const express = require("express");
const router = express.Router();
const Sesion = require("../models/sesion.model");
const Instructor = require("../models/instructor.model");
const Plantilla = require("../models/plantilla.model");

router.get("/", async (req, res) => {
  try {
    const sesiones = await Sesion.find().lean();
    const instructores = await Instructor.find().lean();
    const plantillas = await Plantilla.find().lean();

    const mapaInstructores = {};
    instructores.forEach(i => {
    const id = i._id?.$oid ?? i._id?.toString?.() ?? i._id;
    console.log("Instructor cargado:", id);
    mapaInstructores[id] = `${i.nombres} ${i.apellidos}`;
    });

    const mapaPlantillas = {};
    plantillas.forEach(p => {
    const id = p._id?.$oid ?? p._id?.toString?.() ?? p._id;
    console.log("Plantilla cargada:", id);
    mapaPlantillas[id] = {
        nombre: p.nombre,
        descripcion: p.descripcion,
        capacidadMax: p.capacidadMax
    };
    });



    // Armar respuesta
    const sesionesDetalladas = sesiones.map(s => {
    const instructorId = s.instructorId?.$oid ?? s.instructorId;
    const plantillaId = s.plantillaId?.$oid ?? s.plantillaId;


    console.log(`Comparando: ${instructorId} ∈ instructores?`, mapaInstructores[instructorId]);
    console.log(`Comparando: ${plantillaId} ∈ plantillas?`, mapaPlantillas[plantillaId]);

    return {
        ...s,
        nombreInstructor: mapaInstructores[instructorId] || "Instructor desconocido",
        clase: mapaPlantillas[plantillaId]?.nombre || "Clase desconocida",
        descripcionClase: mapaPlantillas[plantillaId]?.descripcion || "Sin descripción",
        capacidadMax: mapaPlantillas[plantillaId]?.capacidadMax || 0
    };
    });


    res.json(sesionesDetalladas);
  } catch (error) {
    console.error("❌ Error en /api/sesiones:", error);
    res.status(500).json({ error: "Error al obtener sesiones con detalle" });
  }
});

router.post('/', async (req, res) => {
  const nuevaSesion = new Sesion(req.body);
  await nuevaSesion.save();
  res.json({ mensaje: 'Sesión registrada con éxito' });
});

router.delete('/:id', async (req, res) => {
  await Sesion.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Sesión eliminada correctamente' });
});


module.exports = router;
