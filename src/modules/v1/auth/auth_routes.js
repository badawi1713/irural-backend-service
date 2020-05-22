module.exports = (app) => {
  const User = require('./auth_controller');
  const router = require('express').Router();

  // Register
  router.post('/register', User.register);
  app.use('/api/register', router);
};
