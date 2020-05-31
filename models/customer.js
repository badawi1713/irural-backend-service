'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define(
    'Customers',
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Please Enter Your Name' } },
      },
      nama_isp: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'Please Enter Your Name of isp' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: 'Wrong Email Format' },
          notEmpty: { msg: 'Please Enter Your Email' },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Please Enter Your Phone' },
        },
      },
      provinsi: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Please Enter Your Provinsi' } },
      },
      kelurahan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Please Enter Your Kelurahan' } },
      },
      kodepos: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Please Enter Your Kodepos' } },
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Please Enter Your Address' } },
      },
      currentLocation: DataTypes.GEOMETRY('POINT'),
      role: DataTypes.ENUM('User', 'ISP'),
      nik: {
        type: DataTypes.STRING,
        validate: { notEmpty: { msg: 'Please Enter Your Name' } },
      },
    },
    {}
  );
  Customers.associate = function (models) {
    // associations can be defined here
    // Customers.hasMany(photo, { foreignKey: 'photoId' });
  };
  return Customers;
};
