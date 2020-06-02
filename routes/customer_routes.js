const express = require('express');
const router = express.Router();
const customer_control = require('../controllers/customer_registers');
const auth = require('../middlewares/auth');

router.post('/register/:role', customer_control.register);
router.post('/upload', customer_control.uploadfile);

module.exports = router;
