const router = require('express').Router();
adminController = require('../controller/admin_controller');

router.post('/register', adminController.add);
//router.post('/login', userController.login);

module.exports = router;
