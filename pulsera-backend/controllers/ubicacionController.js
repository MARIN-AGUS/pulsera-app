const Ubicacion = require('../models/Ubicacion');

// POST: guardar nueva ubicación
exports.recibirUbicacion = async (req, res) => {
  try {
    const { dispositivoId, latitud, longitud, bateria, red } = req.body;
    const nuevaUbicacion = new Ubicacion({
      dispositivoId,
      latitud,
      longitud,
      bateria,
      red
    });
    await nuevaUbicacion.save();
    res.status(200).json({ message: 'Ubicación guardada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar ubicación' });
  }
};

// ✅ GET: obtener todas las ubicaciones
exports.obtenerUbicaciones = async (req, res) => {
  try {
    const ubicaciones = await Ubicacion.find().sort({ hora: -1 });
    res.status(200).json(ubicaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ubicaciones' });
  }
};