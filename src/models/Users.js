const connection = require('../Configs/Db');
module.exports = {
  auth: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT id,name,email FROM users WHERE id = '${id}'`,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  login: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users WHERE email = ?`,
        email,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT email, password FROM users WHERE email = '${email}'`,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  checkRole: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT role FROM users WHERE id = '${id}'`,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};
