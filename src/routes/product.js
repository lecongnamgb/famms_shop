const ProductController = require('../app/controller/ProductController');
const express = require('express');
const router = express.Router();

router.get('/:type/:name/:color', ProductController.product_information);
router.get('/:type', ProductController.product);
router.post('/addToCart', ProductController.addToCart)

module.exports = router;