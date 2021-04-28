const express = require('express');
const router = express.Router();
const parceirosController = require('../controllers/parceirosController');
const ValidarParceiros = require('../middlewares/ValidarParceiros');

router.get('/',  parceirosController.index);
router.post('/', ValidarParceiros, parceirosController.create);
router.put('/:id', parceirosController.update);
router.delete('/:id', parceirosController.delete);


//Rotas relacionando os dois controllers
router.get('/parceiros/:parceiros_id/imagens', parceirosController.indexImg);
router.post('/parceiros/:parceiros_id/imagens', parceirosController.createImg);

module.exports = router;

