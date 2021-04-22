const express = require('express');
const router = express.Router();
const parceirosController = require('../controllers/parceirosController');

router.get('/', parceirosController.index);
router.post('/', parceirosController.create);
router.put('/:id', parceirosController.update);
router.delete('/:id', parceirosController.delete);


module.exports = router;