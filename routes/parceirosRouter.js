const express = require('express');
const router = express.Router();
const parceirosController = require('../controllers/parceirosController');

// const validarCadastroParceiros = require('../middlewares/ValidarCadastroParceiros');
// const ValidarSenha = require('../middlewares/ValidarSenha');
const { campoVazio, campoRepetido, formatoValido } = require('../middlewares/Valida');

router.get('/',  parceirosController.index);
router.get('/:id/', parceirosController.show);
router.post('/', campoVazio, campoRepetido, formatoValido, parceirosController.create);
router.put('/:id', campoVazio, formatoValido, parceirosController.update);
router.delete('/:id', parceirosController.delete);

//Rotas de Endereços de Parceiros
router.post('/:parceiros_id/endereco', campoVazio, parceirosController.createAddress);
router.put('/:parceiros_id/endereco/:id', campoVazio, parceirosController.updateAddress);
router.delete('/:parceiros_id/endereco/:id/', parceirosController.deleteAddress);

//Rotas de Imagens de Parceiros
router.post('/:parceiros_id/imagem', campoVazio, parceirosController.createImg);
router.delete('/:parceiros_id/imagem/:id', parceirosController.deleteImg);

// Rotar de Artigos de Parceiros
router.post('/:parceiros_id/artigo', campoVazio, parceirosController.createArt);
router.put('/:parceiros_id/artigo/:id', campoVazio, parceirosController.updateArt);
router.delete('/:parceiros_id/artigo/:id', parceirosController.deleteArt);

module.exports = router;


