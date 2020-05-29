'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    'admin',
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Please enter your name' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: { args: [6, 50], msg: 'Please Enter 6 or more character' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Please enter your Password' },
        },
      },
      role: { type: DataTypes.STRING, defaultValue: 'admin' },
    },
    {}
  );

  admin.associate = function (models) {
    // associations can be defined here
  };
  return admin;
};
