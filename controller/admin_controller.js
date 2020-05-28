const Model = require('../models');
jwt = require('jsonwebtoken');
(getError = require('../helpers/getError')),
  (bcrypt = require('../helpers/bcrypt'));

class adminController {
  static add(req, res) {
    console.log(req.body);

    const { nama, email, password } = req.body;
    Model.admin
      .create({
        nama,
        email,
        password,
      })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        if (err.message) {
          res.status(400).json({
            message: getError(err),
          });
        } else {
          res.status(500).json({
            message: `Internal Server Error`,
          });
        }
      });
  }
}

module.exports = adminController;
