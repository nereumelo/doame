const express = require('express');
const router = express.Router();
const artigosController = require('../controllers/artigosController');

router.get('/artigos', artigosController.index);
router.post('/artigos', artigosController.create);
router.put('/artigos/:id', artigosController.update);
router.delete('/artigos/:id', artigosController.delete);

router.get('/parceiros/:parceiros_id/artigos/:artigos_id/imagens', artigosController.indexImg);
router.post('/parceiros/:parceiros_id/artigos/:artigos_id/imagens', artigosController.createImg);
// router.put('/parceiros/:parceiros_id/artigos/:artigos_id/imagens/:id', artigosController.updateImg);
router.delete('/parceiros/:parceiros_id/artigos/:artigos_id/imagens/:id', artigosController.deleteImg);


module.exports = router;