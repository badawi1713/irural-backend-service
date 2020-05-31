const express = require('express');
const router = express.Router();
const admin_control = require('../controller/admin_controller');

router.post('/admin', admin_control.register);
router.post('/admin/login', admin_control.login);

module.exports = router;
