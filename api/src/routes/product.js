const { Router } = require('express');
const { addProduct, getProduct } = require('../controllers/Product');

const router = Router();

router.post('/new', addProduct);
router.get('/all', getProduct);

module.exports = router