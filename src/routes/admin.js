const AdminController = require('../app/controller/AdminController');
const express = require('express');
const router = express.Router();

router.get('/add', AdminController.add);
router.get('/manage', AdminController.manage);
router.post('/add', AdminController.addProduct);

module.exports = router;