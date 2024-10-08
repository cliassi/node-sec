const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, createProduct);
router.get('/', getProducts);

module.exports = router;
