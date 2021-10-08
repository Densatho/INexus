const { Op } = require("sequelize");
const Games = require("../models/games");
const LeagueConn = require("./leagueConnection");
const teamConnection = require("./teamConnection");

module.exports = {
  async getAll() {
    try {
      let games = await Games.findAll();
      return games;
    } catch (error) {}
  },
  async getGameById(id) {
    try {
      let game = await Games.findAll({
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      });
      return game[0];
    } catch (error) {}
  },
  async getGameByTeamsAndDate(date, teamName1, teamName2) {
    let game;
    try {
      date = new Date(date);
      game = await Games.findAll({
        where: {
          TEAM1TEAMNAME: {
            [Op.eq]: teamName1,
          },
          TEAM2TEAMNAME: {
            [Op.eq]: teamName2,
          },
          GAME_DATE: {
            [Op.eq]: date,
          },
        },
      });
      return game[0];
    } catch (error) {}
  },
  async add(date, leagueName, teamName1, teamName2) {
    try {
      date = new Date(date);
      let league = await LeagueConn.getLeagueByName(leagueName);
      let team1 = await teamConnection.getTeamByName(teamName1);
      let team2 = await teamConnection.getTeamByName(teamName2);

      let game = await Games.create({
        GAME_DATE: new Date(date),
        SCOREBOARD: "",
      });
      await game.setLEAGUE(league, {
        through: {
          selfGranted: false,
        },
      });
      await game.setTEAM_1_(team1, {
        through: {
          selfGranted: false,
        },
      });
      await game.setTEAM_2_(team2, {
        through: {
          selfGranted: false,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async update(
    id,
    date,
    scoreboard,
    leagueName,
    teamName1,
    teamName2,
    newDate,
    newLeagueName,
    newTeamName1,
    newTeamName2
  ) {
    try {
      date = new Date(date);
      if (newDate) newDate = new Date(newDate);
      await Games.update(
        {
          GAME_DATE: newDate ? newDate : date,
          SCOREBOARD: scoreboard ? scoreboard : "",
          LEAGUELEAGUENAME: newLeagueName ? newLeagueName : leagueName,
          TEAM1TEAMNAME: newTeamName1 ? newTeamName1 : teamName1,
          TEAM2TEAMNAME: newTeamName2 ? newTeamName2 : teamName2,
        },
        {
          where: {
            id: {
              [Op.eq]: id,
            },
          },
        }
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async delete(id) {
    try {
      date = new Date(date);
      await Games.destroy({
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
