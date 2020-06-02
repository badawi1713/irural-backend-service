'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer_register_files = sequelize.define('customer_register_files', {
    file_url: DataTypes.STRING,
    customer_register_id: DataTypes.INTEGER
  }, {});
  customer_register_files.associate = function(models) {
    // associations can be defined here
  };
  return customer_register_files;
};