const express = require('express');
const router = express.Router();
const { recibirUbicacion, obtenerUbicaciones } = require('../controllers/ubicacionController');

router.post('/', recibirUbicacion);
router.get('/', obtenerUbicaciones);

// ✅ Ruta para eliminar por dispositivoId
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await require('../models/Ubicacion').findOneAndDelete({
      dispositivoId: req.params.id
    });
    if (!deleted) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Dispositivo eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar' });
  }
});

module.exports = router;