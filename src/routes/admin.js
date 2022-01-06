const AdminController = require('../app/controller/AdminController');
const express = require('express');
const router = express.Router();

router.get('/add', AdminController.add);
router.get('/manage/:id/edit', AdminController.edit)
router.get('/manage', AdminController.manage);
router.get('/garbage/:id/restore',AdminController.restore);
router.delete('/garbage/:id/forceDelete',AdminController.forceDelete);
router.get('/garbage', AdminController.garbage);
router.post('/add', AdminController.addProduct);
router.post('/manage/:id/edit', AdminController.update);
router.delete('/manage/:id', AdminController.deleteTemporary);

module.exports = router;