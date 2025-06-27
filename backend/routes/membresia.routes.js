const express = require('express');
const router = express.Router();
const Membresia = require('../models/Membresia');
const Cliente = require('../models/Cliente');

router.get('/', async (req, res) => {
  try {
    const { dni } = req.query;
    if (!dni) return res.status(400).json({ error: 'Falta el parámetro dni' });

    const cliente = await Cliente.findOne({ dni: Number(dni) });
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    const clienteId = cliente._id.toString();
    const membresias = await Membresia.find({ clienteId });

    res.json({
      cliente: {
        dni: cliente.dni,
        nombres: cliente.nombres,
        apellidos: cliente.apellidos
      },
      membresias
    });
  } catch (err) {
    console.error('Error en /api/membresias:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
