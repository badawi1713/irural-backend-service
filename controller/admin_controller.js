const jwt = require('jsonwebtoken');
const adminModel = require('../models').Users;
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
require('dotenv/config');

module.exports = {
  register: (req, res) => {
    adminModel
      .findOne({
        where: { email: { [Op.eq]: req.body.email } },
      })
      .then((admin) => {
        if (admin) {
          res.status(500).json({
            status: false,
            message: 'Admin already exist with email address',
          });
        } else {
          adminModel
            .create({
              nama: req.body.nama,
              email: req.body.email,
              nik: req.body.nik,
              password: bcrypt.hashSync(req.body.password, 10),
            })
            .then((admin) => {
              res.status(200).json({
                status: true,
                message: 'Admin Created SuccessFully',
              });
            });
        }
      });
  },
  login: (req, res) => {
    adminModel
      .findOne({ where: { email: { [Op.eq]: req.body.email } } })
      .then((admin) => {
        if (admin) {
          let password = req.body.password;
          if (bcrypt.compareSync(password, admin.password)) {
            let token = jwt.sign(
              {
                id: admin.id,
              },
              process.env.SECRET,
              {
                expiresIn: 10000,
                notBefore: 30,
              }
            );
            res.status(200).json({
              status: true,
              message: 'Login Successfully',
              admin,
              token: token,
            });
          } else {
            res.status(500).json({
              status: false,
              message: "Password didn't match",
            });
          }
        } else {
          res.status(500).json({
            status: false,
            message: "Admin doesn't Exist with this email address",
          });
        }
      });
  },
};
