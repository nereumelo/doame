const express = require('express');
const router = express.Router();
const doadoresController = require('../controllers/doadoresController');
const validarDoadores = require('../middlewares/ValidarDoadores');
const validarSenha = require('../middlewares/ValidarSenha');

router.get('/', doadoresController.index);
router.post('/', validarDoadores, doadoresController.create);
router.put('/:id', doadoresController.update);
router.put('/:id/new_password', validarSenha, doadoresController.updatePassword);
router.delete('/:id', doadoresController.delete);

module.exports = router;