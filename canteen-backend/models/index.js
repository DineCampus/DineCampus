// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./User');
const StoreModel = require('./Store');
const ItemModel = require('./Item');
const AllowedIDModel = require('./AllowedID'); // Ensure correct casing

const sequelize = new Sequelize('canteen_db', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define models
const User = UserModel(sequelize, DataTypes);
const Store = StoreModel(sequelize, DataTypes);
const Item = ItemModel(sequelize, DataTypes);
const AllowedID = AllowedIDModel(sequelize, DataTypes);

// Setup associations
Store.hasMany(Item, { foreignKey: 'StoreId' });
Item.belongsTo(Store, { foreignKey: 'StoreId' });

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  sequelize,
  User,
  Store,
  Item,
  AllowedID,
};
