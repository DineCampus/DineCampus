// models/AllowedID.js
module.exports = (sequelize, DataTypes) => {
    const AllowedID = sequelize.define('AllowedID', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return AllowedID;
  };
  