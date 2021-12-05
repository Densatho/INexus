const { Op } = require("sequelize");
const Bet = require("../models/bet");
const gamesConnection = require("./gamesConnection");
const teamConnection = require("./teamConnection");
const userConnection = require("./userConnection");

module.exports = {
  async getAll() {
    try {
      let bets = await Bet.findAll();
      return bets;
    } catch (error) {}
  },
  async getBetById(id) {
    try {
      let bet = await Bet.findAll({
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      });
      return bet[0];
    } catch (error) {}
  },
  async getBetsByGameIdAndWinnerTeam(gameId, winnerTeam) {
    try {
      let bets = await Bet.findAll({
        where: {
          GAMEId: {
            [Op.eq]: gameId,
          },
          TEAMTEAMNAME: {
            [Op.eq]: winnerTeam,
          },
        },
      });
      return bets;
    } catch (error) {}
  },
  async getBetByUserAndGame(nickname, gameId) {
    try {
      let bet = await Bet.findAll({
        where: {
          USERNICKNAME: {
            [Op.eq]: nickname,
          },
          GAMEId: {
            [Op.eq]: gameId,
          },
        },
      });
      return bet[0];
    } catch (error) {}
  },
  async add(odd, value, nickname, gameId, teamName) {
    try {
      let user = await userConnection.getUserByNicknameLogin(nickname);
      let game = await gamesConnection.getGameById(gameId);
      let team = await teamConnection.getTeamByName(teamName);

      let bet = await Bet.create({
        ODDS: odd,
        BET_VALUE: value,
      });
      await bet.setUSER(user, {
        through: {
          selfGranted: false,
        },
      });
      await bet.setGAME(game, {
        through: {
          selfGranted: false,
        },
      });
      await bet.setTEAM(team, {
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
  async update(nickname, gameId, gain) {
    try {
      await Bet.update(
        {
          GAIN: gain,
        },
        {
          where: {
            USERNICKNAME: {
              [Op.eq]: nickname,
            },
            GAMEId: {
              [Op.eq]: gameId,
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
  async updateWinners(gameId, winnerTeam) {
    try {
      await Bet.update(
        {
          GAIN: true,
        },
        {
          where: {
            TEAMTEAMNAME: {
              [Op.eq]: winnerTeam,
            },
            GAMEId: {
              [Op.eq]: gameId,
            },
          },
        }
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
    // let bets = betsConn.getAll();
    // let betsUpdate = [];
    // Object.values(bets).map((bet) => {
    //   if (bet.GAMEId === gameId && bet.TEAMTEAMNAME === winnerTeam)
    //     betsUpdate.push(bet);
    // });

    // betsUpdate.forEach(async (bet) => {
    //   let resp = await fetch(
    //     process.env.API_URL + bet.USERNICKNAME + bet.GAMEId,
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         gain: bet.GAIN,
    //       }),
    //     }
    //   );
    //   const json = await resp.json();
    //   console.log(json);
    // });
  },
  async delete(id) {
    try {
      await Bet.destroy({
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
