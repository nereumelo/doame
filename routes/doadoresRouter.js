const express = require('express');
const router = express.Router();
const doadoresController = require('../controllers/doadoresController');

// const validarCadastroDoadores = require('../middlewares/ValidarCadastroDoadores');
// const validarSenha = require('../middlewares/ValidarSenha');
const { campoVazio, campoRepetido, formatoValido } = require('../middlewares/Valida');

router.get('/cadastro', doadoresController.view);


router.get('/', doadoresController.index);
router.post('/', campoVazio, campoRepetido, formatoValido, doadoresController.create);
router.put('/:id', campoVazio, campoRepetido, formatoValido, doadoresController.update);
router.put('/:id/new_password', campoVazio, formatoValido, doadoresController.updatePassword);
router.delete('/:id', doadoresController.delete);

module.exports = router;