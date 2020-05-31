'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define(
    'Photo',
    {
      photo: DataTypes.STRING,
      photoId: DataTypes.INTEGER,
    },
    {}
  );
  Photo.associate = function (models) {
    // associations can be defined here
    // Photo.belongsTo(Customers);
  };
  return Photo;
};
