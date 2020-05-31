'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      nik: DataTypes.INTEGER,
    },
    { timestamps: false }
  );
  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};
