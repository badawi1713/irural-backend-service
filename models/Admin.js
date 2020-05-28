'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    'admin',
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Please enter your name' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: [
          { notNull: { message: 'Please enter your email' } },
          {
            validator: function (val) {
              var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(String(val).toLowerCase());
            },
            message: `Email invalid format`,
          },
          {
            validator: function (val) {
              return User.findOne({ email: val, _id: { $ne: this._id } })
                .then((data) => {
                  if (data) {
                    throw err;
                  }
                })
                .catch((err) => {
                  throw err;
                });
            },
            message: `Please check your email again`,
          },
        ],
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 50],
          notNull: { msg: 'Please enter your Password' },
        },
      },
      role: { type: DataTypes.STRING, defaultValue: 'admin' },
    },
    {
      hooks: {
        beforeCreate: (admin) => {
          const salt = bcrypt.genSaltSync();
          admin.password = bcrypt.hashSync(admin.password, salt);
        },
      },
      instanceMethods: {
        validPassword: function (password) {
          return bcrypt.compareSync(password, this.password);
        },
      },
    }
  );
  admin.associate = function (models) {
    // associations can be defined here
  };
  return admin;
};
