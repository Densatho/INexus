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
      let game = await Games.findByPk(id);
      return game;
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
  async add(date, leagueName, teamName1, teamName2, odd1, odd2) {
    try {
      date = new Date(date);
      let league = await LeagueConn.getLeagueByName(leagueName);
      let team1 = await teamConnection.getTeamByName(teamName1);
      let team2 = await teamConnection.getTeamByName(teamName2);

      let game = await Games.create({
        GAME_DATE: new Date(date),
        SCOREBOARD: "",
        ODD1: odd1,
        ODD2: odd2,
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
    scoreboard,
    date,
    leagueName,
    teamName1,
    odd1,
    teamName2,
    odd2,
    winnerTeam
  ) {
    try {
      date = new Date(date);
      await Games.update(
        {
          GAME_DATE: date,
          SCOREBOARD: scoreboard,
          ODD1: odd1,
          ODD2: odd2,
          LEAGUELEAGUENAME: leagueName,
          TEAM1TEAMNAME: teamName1,
          TEAM2TEAMNAME: teamName2,
          WinnerTeamTEAMNAME: winnerTeam,
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
