const mongoose = require('mongoose');

const UbicacionSchema = new mongoose.Schema({
  dispositivo: {
    type: String,
    required: true
  },
  coordenadas: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ubicacion', UbicacionSchema);