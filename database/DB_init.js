const { Sequelize, Op } = require("sequelize");
const User = require("./models/user");
const League = require("./models/league");
const Team = require("./models/team");
const Admin = require("./models/admin");
const Games = require("./models/games");
const Bet = require("./models/bet");

authenticate = async () => {
  try {
    await User.sync();

    await League.sync();
    await Team.sync();

    Admin.belongsTo(User);
    await Admin.sync();

    Games.belongsTo(League);
    Games.belongsTo(Team, {
      as: "TEAM_1_",
    });
    Games.belongsTo(Team, {
      as: "TEAM_2_",
    });
    await Games.sync();

    Bet.belongsTo(User);
    Bet.belongsTo(Games);

    await Bet.sync();
  } catch (error) {
    console.log("Unable to connect to the database.", error);
  }
};

module.exports = authenticate;
