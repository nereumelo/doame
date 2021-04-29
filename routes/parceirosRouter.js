const express = require('express');
const router = express.Router();
const parceirosController = require('../controllers/parceirosController');
const ValidarParceiros = require('../middlewares/ValidarParceiros');

router.get('/',  parceirosController.index);
router.get('/:id/', parceirosController.show);
router.post('/', ValidarParceiros, parceirosController.create);
router.put('/:id', parceirosController.update);
router.delete('/:id', parceirosController.delete);



//Rotas de Endereços de Parceiros
router.post('/:parceiros_id/endereco', parceirosController.createAddress);
router.put('/:parceiros_id/endereco/:id', parceirosController.updateAddress);
router.delete('/:parceiros_id/endereco/:id/', parceirosController.deleteAddress);


//Rotas de Imagens de Parceiros
router.post('/:parceiros_id/imagem', parceirosController.createImg);
router.delete('/:parceiros_id/imagem/:id', parceirosController.deleteImg);

module.exports = router;


