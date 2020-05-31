const express = require('express');
const router = express.Router();
const user_control = require('../controller/user_controller');
const auth = require('../middlewares/auth');

router.post('/register/:role', user_control.register);
router.post('/upload/:id', user_control.uploadfile);
router.get('/get/user', auth.authentication, user_control.takefile);
router.get('/get/isp', user_control.take);

module.exports = router;
