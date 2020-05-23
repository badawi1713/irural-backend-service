module.exports = (app) => {
  const User = require('./auth_controller');
  const router = require('express').Router();

  // Register
  router.get('/getAll', User.getUsers);
  router.post('/register', User.register);
  app.use('/api/auth', router);
};
