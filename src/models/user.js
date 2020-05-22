module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'users',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING },
      role: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      address: { type: Sequelize.STRING },
      nameofisp: { type: Sequelize.STRING },
      nomor_ktp: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      gps: { type: Sequelize.STRING },
      photo: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
    },
    { timestamps: false, createdAt: false }
  );
  return User;
};
