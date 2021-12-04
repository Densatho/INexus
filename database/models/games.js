const { Sequelize, DataTypes, Model } = require("sequelize");
const config = require("../config");
const League = require("./league");
const Team = require("./team");

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
  ODD1: {
    type: DataTypes.FLOAT,
  },
  ODD2: {
    type: DataTypes.FLOAT,
  },
};

class Games extends Model {}
Games.init(databaseConfig, { sequelize, modelName: "GAMES" });

Games.belongsTo(League);
Games.belongsTo(Team, {
  as: "TEAM_1_",
});
Games.belongsTo(Team, {
  as: "TEAM_2_",
});
Games.belongsTo(Team, {
  as: "WinnerTeam",
});

module.exports = Games;
