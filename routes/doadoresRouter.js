const express = require('express');
const router = express.Router();
const doadoresController = require('../controllers/doadoresController');

router.get('/', doadoresController.index);
router.post('/', doadoresController.create);



module.exports = router;