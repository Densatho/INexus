const { Sequelize, DataTypes, Model } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(config);

const databaseConfig = {};

class Admin extends Model {}
Admin.init(databaseConfig, { sequelize, modelName: "ADMIN" });

module.exports = Admin;
