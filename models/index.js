// models/db.setup.js

const sequelize = require("./db");
const Sequelize = require("sequelize");
const Store = require("./store.model");
const User = require("./user.model");
const Role = require("./role.model");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Store = Store;
db.User = User;
db.Role = Role;

// Association
db.User.belongsToMany(db.Role, { through: "user_roles" });
db.Role.belongsToMany(db.User, { through: "user_roles" });
db.User.hasMany(db.Store, { foreignKey: "adminId" });
db.Store.belongsTo(db.User, { foreignKey: "adminId" });

module.exports = db;
