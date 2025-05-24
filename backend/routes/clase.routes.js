const express = require('express');
const router = express.Router();
const SesionClase = require('../models/SesionClase');
const PlantillaClase = require('../models/PlantillaClase');
const Instructor = require('../models/Instructor');
const Reserva = require('../models/Reserva'); // opcional

router.get('/', async (req, res) => {
  const { fecha } = req.query;
  if (!fecha) return res.status(400).json({ error: 'Falta la fecha' });

  try {
    const sesiones = await SesionClase.aggregate([
      {
        $match: {
          $expr: {
            $eq: [
              { $dateToString: { format: "%Y-%m-%d", date: "$inicio", timezone: "America/Lima" } },
              fecha
            ]
          }
        }
      }
    ]);

    const plantillas = await PlantillaClase.find();
    const instructores = await Instructor.find();
    const reservas = await Reserva.find();

    const clases = sesiones.map((sesion) => {
      const plantilla = plantillas.find(p => p._id.toString() === sesion.plantillaId);
      const instructor = instructores.find(i => i._id.toString() === sesion.instructorId);
      const numReservas = reservas.filter(r => r.sesionId === sesion._id.toString()).length;

      return {
        id: sesion._id,
        clase: plantilla?.nombre || 'Sin clase',
        instructor: instructor ? `${instructor.nombres} ${instructor.apellidos}` : 'Desconocido',
        inicio: sesion.inicio,
        fin: sesion.fin,
        capacidad: plantilla?.capacidadMax || 10,
        reservas: numReservas
      };
    });

    res.json(clases);
  } catch (error) {
    console.error('❌ Error al obtener clases:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


module.exports = router;
