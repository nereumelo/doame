const express = require('express');
const router = express.Router();
const artigosController = require('../controllers/artigosController');

router.get('/', artigosController.index);
router.post('/', artigosController.create);
router.put('/:id', artigosController.update);
router.delete('/:id', artigosController.delete);

module.exports = router;