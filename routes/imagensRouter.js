const express = require('express');
const router = express.Router();
const imagensController = require('../controllers/imagensController');

router.get('/', imagensController.index);
router.post('/', imagensController.create);
router.put('/:id', imagensController.update);


module.exports = router;