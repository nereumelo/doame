const express = require('express');
const router = express.Router();
const parceirosController = require('../controllers/parceirosController');
const validarCadastroParceiros = require('../middlewares/ValidarCadastroParceiros');
const ValidarSenha = require('../middlewares/ValidarSenha');

router.get('/',  parceirosController.index);
router.get('/:id/', parceirosController.show);
router.post('/', validarCadastroParceiros, parceirosController.create);
router.put('/:id', ValidarSenha, parceirosController.update);
router.delete('/:id', parceirosController.delete);



//Rotas de Endereços de Parceiros
router.post('/:parceiros_id/endereco', parceirosController.createAddress);
router.put('/:parceiros_id/endereco/:id', parceirosController.updateAddress);
router.delete('/:parceiros_id/endereco/:id/', parceirosController.deleteAddress);


//Rotas de Imagens de Parceiros
router.post('/:parceiros_id/imagem', parceirosController.createImg);
router.delete('/:parceiros_id/imagem/:id', parceirosController.deleteImg);

// Rotar de Artigos de Parceiros
router.post('/:parceiros_id/artigo', parceirosController.createArt);
router.put('/:parceiros_id/artigo/:id', parceirosController.updateArt);
router.delete('/:parceiros_id/artigo/:id', parceirosController.deleteArt);

module.exports = router;


