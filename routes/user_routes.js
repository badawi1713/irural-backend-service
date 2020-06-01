const express = require('express');
const router = express.Router();
const user_control = require('../controller/user_controller');
const auth = require('../middlewares/auth');

router.post('/register/:role', user_control.register);
router.post('/upload/:id', user_control.uploadfile);
router.get('/get/user', auth.authentication, user_control.takefile);
router.get('/get/isp', auth.authentication, user_control.take);
router.get('/getAll/upload', auth.authentication, user_control.getAll);
router.get('/getbyid/:id', auth.authentication, user_control.getByid);
router.get('/getAllbyid/:id', auth.authentication, user_control.getAllByid);

module.exports = router;
