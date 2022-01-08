const ProductController = require('../app/controller/ProductController');
const express = require('express');
const router = express.Router();

router.get('/:type/:name', ProductController.product_information);
router.get('/:type', ProductController.product);

module.exports = router;