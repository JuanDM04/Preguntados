const mongoose = require('mongoose');

const PreguntaSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  pregunta:  { type: String, required: true },
  opciones:  [{ type: String, required: true }],
  correcta:  { type: Number, required: true }
});

module.exports = mongoose.model('Pregunta', PreguntaSchema);