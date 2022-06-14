const { Router } = require('express');
const { getOrder, postOrder, userIsSubscribed } = require('../controllers/Order');

const router = Router();

router.get('/', getOrder);
router.get('/:idOrder', getOrder);
router.post('/:idUser', postOrder);
router.put('/isSuscribed/:idUser', userIsSubscribed)

module.exports= router;