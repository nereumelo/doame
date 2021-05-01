const express = require('express');
const router = express.Router();
const doacoesController = require('../controllers/doacoesController');

const { campoVazio } = require('../middlewares/Valida');

router.get('/', doacoesController.index);
router.get('/doador/:doadores_id', doacoesController.showDoadores);
router.get('/parceiro/:parceiros_id', doacoesController.showParceiros);
router.post('/', campoVazio, doacoesController.create);
router.put('/:id', campoVazio, doacoesController.update);
router.delete('/:id', doacoesController.delete);

module.exports = router;