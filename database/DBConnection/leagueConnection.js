const { Op } = require("sequelize");
const League = require("../models/league");

module.exports = {
  async getAll() {
    try {
      let leagues = await League.findAll();
      return leagues;
    } catch (error) {}
  },
  async getLeagueByName(leagueName) {
    let league;
    try {
      league = await League.findAll({
        where: {
          LEAGUE_NAME: {
            [Op.eq]: leagueName,
          },
        },
      });
      return league[0];
    } catch (error) {}
  },
  async add(leagueName, region) {
    try {
      await League.create({
        LEAGUE_NAME: leagueName,
        REGION: region,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async update(leagueName, newLeagueName, region) {
    try {
      if (newLeagueName) {
        await League.update(
          {
            LEAGUE_NAME: newLeagueName,
            REGION: region,
          },
          {
            where: {
              LEAGUE_NAME: {
                [Op.eq]: leagueName,
              },
            },
          }
        );
      } else {
        await League.update(
          {
            REGION: region,
          },
          {
            where: {
              LEAGUE_NAME: {
                [Op.eq]: leagueName,
              },
            },
          }
        );
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async delete(leagueName) {
    try {
      await League.destroy({
        where: {
          LEAGUE_NAME: {
            [Op.eq]: leagueName,
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
