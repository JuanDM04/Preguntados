const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/api'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado ✅');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Servidor corriendo en puerto 5000 ✅');
    });
  })
  .catch(err => console.error('Error MongoDB:', err));