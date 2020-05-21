require('dotenv').config();

const User = require('../models/Users');
const fs = require('fs-extra');
const misc = require('../helpers/misc');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const redisClient = redis.createClient();
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

module.exports = {
  auth: async (request, response) => {
    const user_id = request.user.id;
    try {
      const data = await User.auth(user_id);
      misc.response(response, 200, false, 'Successfull authentication', data);
    } catch (error) {
      console.error(error.message);
      misc.response(response, 500, true, 'Server error');
    }
  },
  login: async (request, response) => {
    const { email, password } = request.body;
    const checkEmail = emailRegex.test(email);
    try {
      misc.response(response, 200, false, 'Successfull login', data);
    } catch (error) {
      console.error(error.message);
      misc.response(response, 500, true, 'Server error');
    }
  },
  register: async (request, response) => {
    const { role } = request.body;
    let error = false;
    if (request) {
      if (request.file) {
        if (request.file.size >= 5242880) {
          const message = 'Oops!, Size cannot more than 5MB';
          misc.response(response, 400, false, message);
          error = true;
          fs.unlink(`public/images/profile/${request.file.filename}`, function (
            error
          ) {
            if (error) misc.response(response, 400, false, error);
          });
        }
        const file = request.file.filename;
        const extension = file.split('.');
        const filename = extension[extension.length - 1];

        if (!isImage(filename)) {
          const message = 'Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG';
          misc.response(response, 400, false, message);
          error = true;
          fs.unlink(`public/images/profile/${request.file.filename}`, function (
            error
          ) {
            if (error) misc.response(response, 400, false, error);
          });
        }
        function isImage(filename) {
          switch (filename) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'svg':
              return true;
          }
          return false;
        }
      }
    }
    const photo = request.file.filename;
    try {
      let requireCheck = [];
      let data = {};
      if (request.body.role === 'customer') {
        const { name, address, phone, email, nomor_ktp } = request.body;
        !name ? requireCheck.push('Name is required') : '';
        !address ? requireCheck.push('Alamat is required') : '';
        !phone ? requireCheck.push('Nomor Telepon is required') : '';
        !email ? requireCheck.push('Email is required') : '';
        !nomor_ktp ? requireCheck.push('Nomor ktp is required') : '';
        if (requireCheck.length) {
          return misc.response(response, 400, false, 'Not Valid', {
            errors: [{ msg: requireCheck }],
          });
        }
        data = { role, name, address, phone, email, nomor_ktp };
      } else if (request.body.role === 'ISP' && error === false) {
        const { name_isp, address, name, email, phone } = request.body;
        !name ? requireCheck.push('Name is required') : '';
        !name_isp ? requireCheck.push('Name of isp is required') : '';
        !address ? requireCheck.push('Alamat is required') : '';
        !phone ? requireCheck.push('Nomor Telepon is required') : '';
        !email ? requireCheck.push('Email is required') : '';
        !nomor_ktp ? requireCheck.push('Nomor ktp is required') : '';
        if (requireCheck.length) {
          return misc.response(response, 400, false, 'Not Valid', {
            errors: [{ msg: requireCheck }],
          });
        }
        data = { role, name_isp, address, name, email, phone, photo };
      }
      await User.register(data);
      redisClient.flushdb();
      misc.response(response, 200, false, 'Success Register');
    } catch (error) {
      console.error(error.message);
      misc.response(response, 500, true, 'Server error');
    }
  },
};
