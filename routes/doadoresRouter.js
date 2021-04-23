const express = require('express');
const router = express.Router();
const doadoresController = require('../controllers/doadoresController');

router.get('/', doadoresController.index);
router.post('/', doadoresController.create);
router.put('/:id', doadoresController.update);
router.delete('/:id', doadoresController.delete);

module.exports = router;