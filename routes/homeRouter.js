const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.view);
router.get('/obrigado', homeController.thanks);
router.post('/login', homeController.auth);
router.get('/logout', homeController.logout);

module.exports = router;