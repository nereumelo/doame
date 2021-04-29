const express = require('express');
const router = express.Router();
const parceirosController = require('../controllers/parceirosController');
const ValidarParceiros = require('../middlewares/ValidarParceiros');

router.get('/',  parceirosController.index);
router.post('/', ValidarParceiros, parceirosController.create);
router.put('/:id', parceirosController.update);
router.delete('/:id', parceirosController.delete);



//Rotas de Endereços de Parceiros
router.post('/:id', parceirosController.createAddress);
router.put('/:parceiros_id/:id', parceirosController.updateAddress);
router.delete('/:parceiros_id/:id', parceirosController.deleteAddress);


//Rotas de Imagens de Parceiros
router.get('/parceiros/:parceiros_id/imagens', parceirosController.indexImg);
router.post('/parceiros/:parceiros_id/imagens', parceirosController.createImg);

module.exports = router;


