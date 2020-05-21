const express = require('express');
const Auth = require('../Controllers/Auth');
const Route = express.Router();

Route.get('/', Auth.auth)
  .post('/login', Auth.login)
  .post('/register', Auth.register);

module.exports = Route;
