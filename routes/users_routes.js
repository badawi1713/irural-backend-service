const express = require('express');
const router = express.Router();
const users_control = require('../controllers/users');

router.put('/register', users_control.register); // endpoint untuk register admin
router.post('/login', users_control.login); //endpoint untuk login admin

module.exports = router;
