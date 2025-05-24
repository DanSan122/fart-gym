const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// GET todos
router.get('/', async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
});

// POST nuevo cliente
router.post('/', async (req, res) => {
  const nuevo = new Cliente(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
});

module.exports = router;
