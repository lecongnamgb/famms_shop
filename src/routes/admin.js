const AdminController = require('../app/controller/AdminController');
const express = require('express');
const router = express.Router();

router.get('/add', AdminController.add);
router.get('/manage/:id/edit', AdminController.edit)
router.get('/manage', AdminController.manage);
router.post('/add', AdminController.addProduct);
router.post('/manage/:id/edit', AdminController.update);

module.exports = router;