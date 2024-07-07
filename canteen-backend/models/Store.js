module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  return Store;
};
