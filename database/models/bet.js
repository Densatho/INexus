const { Sequelize, DataTypes, Model } = require("sequelize");
const config = require("../config");
const User = require("./user");
const Games = require("./games");
const Team = require("./team");

const sequelize = new Sequelize(config);

const databaseConfig = {
  ODDS: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  BET_VALUE: {
    type: DataTypes.FLOAT,
  },
  GAIN: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

class Bet extends Model {}
Bet.init(databaseConfig, { sequelize, modelName: "BET" });
Bet.belongsTo(User);
Bet.belongsTo(Games);
Bet.belongsTo(Team);

module.exports = Bet;
