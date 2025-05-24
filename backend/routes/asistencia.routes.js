const express = require('express');
const router = express.Router();
const Asistencia = require('../models/Asistencia');
const Cliente = require('../models/Cliente');
const mongoose = require('mongoose');

router.get('/lista', async (req, res) => {
  try {
    const { fecha } = req.query;
    if (!fecha) return res.status(400).json({ error: 'Falta parámetro fecha' });

    const asistencias = await Asistencia.find({
      $expr: {
        $eq: [
          { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
          fecha
        ]
      }
    });

    console.log('▶️ Asistencias encontradas:', asistencias.length);

    if (asistencias.length === 0) {
      return res.json([]);
    }

    const clienteIds = asistencias.map(a => new mongoose.Types.ObjectId(a.clienteId));
    const clientes = await Cliente.find({ _id: { $in: clienteIds } });

    const resultado = asistencias.map(a => {
      const cliente = clientes.find(c => c._id.toString() === a.clienteId);
      return {
        clienteId: a.clienteId,
        nombres: cliente?.nombres || 'Desconocido',
        apellidos: cliente?.apellidos || '',
        fecha: a.fecha,
        asistio: a.asistio
      };
    });

    res.json(resultado);
  } catch (err) {
    console.error('❌ Error en /api/asistencias/lista:', err);
    res.status(500).json({ error: 'Error al obtener la lista de asistencias' });
  }
});


module.exports = router;
