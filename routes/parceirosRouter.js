const express = require('express');
const router = express.Router();
const parceirosController = require('../controllers/parceirosController');

// const validarCadastroParceiros = require('../middlewares/ValidarCadastroParceiros');
// const ValidarSenha = require('../middlewares/ValidarSenha');
const { campoVazio, campoRepetido, formatoValido } = require('../middlewares/Valida');
const { estaLogado } = require('../middlewares/Autentica');

router.get('/cadastro', parceirosController.viewCadastro);

router.get('/JSON', parceirosController.indexJSON);
router.get('/', parceirosController.viewIndex);

router.get('/:id/JSON', parceirosController.showJSON);
router.get('/:id/', parceirosController.viewShow);

router.get('/:id/doar', estaLogado, parceirosController.viewDonate);

router.post('/', campoVazio, campoRepetido, formatoValido, parceirosController.create);
router.put('/:id', campoVazio, formatoValido, parceirosController.update);
router.delete('/:id', parceirosController.delete);

//Rotas de Endereços de Parceiros
router.post('/:parceiros_id/endereco', campoVazio, parceirosController.createAddress);
router.put('/:parceiros_id/endereco/:id', campoVazio, parceirosController.updateAddress);
router.delete('/:parceiros_id/endereco/:id/', parceirosController.deleteAddress);

// Rotar de Artigos de Parceiros
router.post('/:parceiros_id/artigo', campoVazio, parceirosController.createArt);
router.put('/:parceiros_id/artigo/:id', campoVazio, parceirosController.updateArt);
router.delete('/:parceiros_id/artigo/:id', parceirosController.deleteArt);

module.exports = router;