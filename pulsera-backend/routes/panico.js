const express = require('express');
const router = express.Router();
const { enviarAlerta } = require('../controllers/panicoController');

router.post('/', enviarAlerta);

module.exports = router;
