const adminModel = require('../models').admin;
const bcrypt = require('bcrypt');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class adminController {
  static register(req, res) {
    adminModel
      .findOne({ where: { email: { [Op.eq]: req.body.email } } })
      .then((admin) => {
        if (admin) {
          res.status(500).json({
            status: false,
            message: 'Admin Already Exist',
          });
        } else {
          adminModel
            .create({
              nama: req.body.nama,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10),
            })
            .then((admin) => {
              res.status(200).json({
                status: true,
                message: 'Admin create Successfully',
              });
            });
        }
      });
  }
}
module.exports = adminController;
