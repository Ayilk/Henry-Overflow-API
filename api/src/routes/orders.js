const { Router } = require('express');
const { getOrder, postOrder } = require('../controllers/Order');
const router = Router();

router.get('/', getOrder);
router.get('/:idOrder', getOrder);
router.post('/:idUser', postOrder);

module.exports= router;