const express = require('express');
const enderecoController = require('../controllers/enderecoController');
const router = express.Router();


router.get('/', enderecoController.index);
router.post('/', enderecoController.create);
router.put('/:id', enderecoController.update);
router.delete('/:id', enderecoController.delete);

module.exports = router;