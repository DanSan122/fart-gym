const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Ruta para validar login
router.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const user = await Usuario.findOne({ usuario });

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (user.contrasena !== contrasena) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.json({ mensaje: 'Login exitoso' });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});


module.exports = router;
