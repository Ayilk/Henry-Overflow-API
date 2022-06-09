const { Router } = require('express');
const { getOrder, postOrder } = require('../controllers/Order');
const router = Router();


router.get('/:idOrder', getOrder);
router.post('/:idUser', postOrder);

module.exports= router;