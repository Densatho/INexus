const { Sequelize, DataTypes, Model } = require("sequelize");
const { config } = require("../config");

const sequelize = new Sequelize(config);

const databaseConfig = {
  TEAM_NAME: {
    type: DataTypes.TEXT,
    primaryKey: true,
    allowNull: false,
  },
  WINS: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  LOSSES: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
};

class Team extends Model {}
Team.init(databaseConfig, { sequelize, modelName: "TEAM" });

module.exports.Team = Team;
