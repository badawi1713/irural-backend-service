const db = require('../../../models');
const User = db.User;
const fs = require('fs-extra');
//const Op = db.Sequelize.Op;

const misc = require('../../../helpers/misc');
const redis = require('redis');
const redisClient = redis.createClient();

exports.register = async (request, response) => {
  let body = request.body;
  try {
  } catch (error) {}
};
exports.login = (request, response) => {};
exports.isAdmin = async function (id) {
  return await User.findOne({
    where: {
      id: id,
      role: 'admin',
    },
  });
  exports.getALl = async (request, response) => {
    try {
      let isAdmin = await exports.isAdmin(request.user.id);
      if (!isAdmin) {
        return misc.response(response, 500, true, 'Anda Bukan Admin');
      }
      let users = await User.findAll({
        attributes: ['id', 'name', 'email', 'created_at', 'updated_at', 'role'],
      });
    } catch (error) {}
  };
};
