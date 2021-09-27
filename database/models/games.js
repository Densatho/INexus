const { Sequelize, DataTypes, Model } = require("sequelize");
const { config } = require("../config");

const sequelize = new Sequelize(config);

const databaseConfig = {
  GAME_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  SCOREBOARD: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

class Games extends Model {}
Games.init(databaseConfig, { sequelize, modelName: "GAMES" });

module.exports.Games = Games;
