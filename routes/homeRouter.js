const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.view);
router.get('/lista-parceiros', homeController.listaParceiros);

router.post('/login', homeController.auth);

module.exports = router;