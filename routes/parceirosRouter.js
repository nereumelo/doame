const express = require('express');
const router = express.Router();
const parceirosController = require('../controllers/parceirosController');
const ValidarParceiros = require('../middlewares/ValidarParceiros');

router.get('/',  parceirosController.index);
router.post('/', ValidarParceiros, parceirosController.create);
router.put('/:id', parceirosController.update);
router.delete('/:id', parceirosController.delete);


//Rotas de Endereços de Parceiros

// router.get('/:id/enderecos/', parceirosController.showAdress);
router.post('/:parceiros_id/enderecos/', parceirosController.createAddress);

module.exports = router;