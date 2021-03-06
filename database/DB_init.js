const { Sequelize, Op } = require("sequelize");
const User = require("./models/user");
const League = require("./models/league");
const Team = require("./models/team");
const Games = require("./models/games");
const Bet = require("./models/bet");

authenticate = async () => {
  try {
    await User.sync();
    await League.sync();
    await Team.sync();
    await Games.sync();
    await Bet.sync();

    console.log("Database initialized");
  } catch (error) {
    console.log("Unable to connect to the database.", error);
  }
};
authenticate();
