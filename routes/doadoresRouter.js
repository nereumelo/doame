const express = require('express');
const doadoresController = require('../controllers/doadoresController');
const router = express.Router();

router.get('/', doadoresController.index);
router.post('/', doadoresController.create);
router.put('/:id', doadoresController.update);
router.delete('/:id', doadoresController.delete);

module.exports = router;