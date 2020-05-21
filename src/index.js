const express = require('express');
const auth = require('./routes/Auth');
const Route = express.Router();

Route.use('/api/v1/auth', auth);

module.exports = Route;
