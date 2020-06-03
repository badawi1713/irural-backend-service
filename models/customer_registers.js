"use strict";
module.exports = (sequelize, DataTypes) => {
  const customer_registers = sequelize.define(
    "customer_registers",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Please Enter Your Name" } },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Please Enter Your Address" } },
      },
      subdistrict: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Please Enter Your Subdistrict" } },
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Please Enter Your Province" } },
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Please Enter Your Zip Code" } },
      },
      contact_number: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { notEmpty: { msg: "Please Enter Your Phone" } },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: { msg: "Wrong Email Format" },
          notEmpty: { msg: "Please Enter Your Email" },
        },
      },
      identity_number: DataTypes.STRING,
      location: DataTypes.GEOMETRY("POINT"),
      isp_name: DataTypes.STRING,
      isp_contact_number: {
        type: DataTypes.STRING,
        validate: { notEmpty: { msg: "Please Enter Your Phone Office" } },
      },
      isp_email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: { msg: "Wrong Email Format" },
          notEmpty: { msg: "Please Enter Your Email" },
        },
      },
      role: DataTypes.ENUM("Customer", "ISP"),
    },
    {}
  );
  customer_registers.associate = function (models) {
    // associations can be defined here
  };
  return customer_registers;
};
