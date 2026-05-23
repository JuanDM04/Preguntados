const router = require('express').Router();
const Pregunta = require('../models/Pregunta');

router.get('/categorias', async (req, res) => {
  try {
    const cats = await Pregunta.distinct('categoria');
    res.json(cats);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/pregunta/:categoria', async (req, res) => {
  try {
    const preguntas = await Pregunta.find({ categoria: req.params.categoria });
    const random = preguntas[Math.floor(Math.random() * preguntas.length)];
    res.json(random);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/seed', async (req, res) => {
  try {
    const data = require('../data/preguntas');
    await Pregunta.deleteMany({});
    await Pregunta.insertMany(data);
    res.json({ mensaje: 'Base de datos cargada ✅', total: data.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;