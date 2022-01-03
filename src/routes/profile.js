const ProfileController = require('../app/controller/ProfileController');
const express = require('express');
const authMiddleware = require('../app/middlewares/auth.middleware');
const router = express.Router();

router.put('/:username/update', ProfileController.update_info);
router.get('/:_id',authMiddleware.requireAuth, ProfileController.user_profile);

module.exports = router;