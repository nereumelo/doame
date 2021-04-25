const express = require('express');
const doadoresController = require('../controllers/doadoresController');
const ValidarDoadores = require('../middlewares/ValidarDoadores');
const router = express.Router();

router.get('/', doadoresController.index);
router.post('/', ValidarDoadores, doadoresController.create);
router.put('/:id', doadoresController.update);
router.delete('/:id', doadoresController.delete);

module.exports = router;