const db = require('../../../models');
const User = db.User;
const fs = require('fs-extra');
//const Op = db.Sequelize.Op;

const misc = require('../../../helpers/misc');
const redis = require('redis');
const redisClient = redis.createClient();

exports.register = async (request, response) => {
  let data = {};
  if (request.body.role === 'customer') {
    const { name, address, phone, email, nomor_ktp } = request.body;
    data = { role, name, address, phone, email, nomor_ktp };
  } else {
    const { nameofisp, name, address, email, photo, phone } = request.body;
    data = { role, nameofisp, name, address, email, photo, phone };
  }

  console.log('testhhhhhh', request.body.role);
  //.then((usr) => {
  //console.log(usr, 'haloooooooo');
  //});
};
exports.login = (request, response) => {};
exports.isAdmin = async function (id) {
  return await User.findOne({
    where: {
      id: id,
      role: 'admin',
    },
  });
};

exports.getUsers = async function (req, res) {
  try {
    let isAdmin = await exports.isAdmin(req.user.id);

    if (!isAdmin) {
      return res.status(401).send('Unauthorized');
    }

    let users = await User.findAll({
      attributes: [
        'id',
        'name',
        'nameofisp',
        'email',
        'photo',
        'phone',
        'role',
      ],
    });

    if (users) {
      return res.send(users);
    }

    throw new Error('Something went wrong');
  } catch (e) {
    console.error(error.message);
    misc.response(response, 500, true, 'Server error');
  }
};
