const CartController = require('../app/controller/CartController');
const express = require('express');
const router = express.Router();


router.get('/', CartController.cart);
router.get('/remove/:id', CartController.remove);


module.exports = router;