const { Sequelize, DataTypes, Model } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(config);

const databaseConfig = {
  LEAGUE_NAME: {
    type: DataTypes.TEXT,
    primaryKey: true,
    allowNull: false,
  },
  REGION: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

class League extends Model {}
League.init(databaseConfig, { sequelize, modelName: "LEAGUE" });

module.exports = League;
