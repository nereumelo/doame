const express = require('express');
const router = express.Router();
const doacoesController = require('../controllers/doacoesController');

router.get('/', doacoesController.index);
router.post('/', doacoesController.create);
router.put('/:id', doacoesController.update);
router.delete('/:id', doacoesController.delete);

module.exports = router;