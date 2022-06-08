require('dotenv').config();
const { Router } = require('express');
const { payment, createOrder, captureOrder, cancelOrder, createProduct, createPlan, listProducts } = require('../controllers/payment');
const router = Router();


router.post('/create-order', createOrder );
router.get('/capture-order', captureOrder);
router.get('/cancel-order', cancelOrder);
router.post('/create-product', createProduct)
router.post('/create-plan', createPlan);
router.get('/list-products', listProducts)

module.exports = router