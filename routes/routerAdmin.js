const router = require('express').Router();
const adminController = require('../controller/admin_controller');

router.post('/register', adminController.register);
//router.post('/login', adminController.login);

module.exports = router;
