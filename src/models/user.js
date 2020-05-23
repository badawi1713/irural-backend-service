module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'users',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING },
      address: { type: Sequelize.STRING, allowNull: false },
      nameofisp: { type: Sequelize.STRING },
      nomor_ktp: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING, allowNull: false },
      gps: { type: Sequelize.STRING },
      photo: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING, allowNull: false },
    },
    { timestamps: true }
  );
  return User;
};
