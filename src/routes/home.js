const HomeController = require('../app/controller/HomeController');
const AuthMiddleware = require('../app/middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.get('/', HomeController.home);
router.get('/home', HomeController.home);
router.post('/profile/:username',HomeController.profile);
router.post('/profile',HomeController.profile);
router.post('/signIn', HomeController.signIn);
router.post('/forgetPw', HomeController.forgetPw);
router.get('/logOut', HomeController.logOut);

module.exports = router;