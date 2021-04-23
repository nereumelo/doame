const express = require('express');
const doacoesController = require('../controllers/doacoesController');
const router = express.Router();

router.get('/', doacoesController.index);
router.post('/', doacoesController.create);
router.put('/:id', doacoesController.update);
router.delete('/:id', doacoesController.delete);

module.exports = router;