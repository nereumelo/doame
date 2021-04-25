const express = require('express');
const router = express.Router();
const parceirosController = require('../controllers/parceirosController');
const ValidarParceiros = require('../middlewares/ValidarParceiros');

router.get('/',  parceirosController.index);
router.post('/', ValidarParceiros, parceirosController.create);
router.put('/:id', parceirosController.update);
router.delete('/:id', parceirosController.delete);


module.exports = router;