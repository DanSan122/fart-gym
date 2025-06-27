const express = require('express');
const router = express.Router();
const Instructor = require('../models/instructor.model'); // Ajusta el path según tu estructura

router.get('/', async (req, res) => {
  try {
    const instructores = await Instructor.find();
    res.json(instructores); // ✅ JSON correcto
  } catch (error) {
    console.error('Error al obtener instructores:', error);
    res.status(500).json({ error: 'Error al obtener instructores' });
  }
});

module.exports = router;
