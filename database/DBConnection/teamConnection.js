const { Op } = require("sequelize");
const Team = require("../models/team");

module.exports = {
  async getAll() {
    try {
      let team = await Team.findAll();
      return team;
    } catch (error) {}
  },
  async getTeamByName(teamName) {
    let team;
    try {
      team = await Team.findAll({
        where: {
          TEAM_NAME: {
            [Op.eq]: teamName,
          },
        },
      });
      return team[0];
    } catch (error) {}
  },
  async add(teamName) {
    try {
      await Team.create({
        TEAM_NAME: teamName,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async update(teamName, newTeamName) {
    try {
      await Team.update(
        {
          TEAM_NAME: newTeamName,
        },
        {
          where: {
            TEAM_NAME: {
              [Op.eq]: teamName,
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
  async delete(teamName) {
    try {
      await Team.destroy({
        where: {
          TEAM_NAME: {
            [Op.eq]: teamName,
          },
        },
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async incrimentWin(teamName) {
    try {
      let team = await this.getTeamByName(teamName);
      team.dataValues.WINS += 1;

      await Team.update(
        {
          WINS: team.dataValues.WINS,
        },
        {
          where: {
            TEAM_NAME: {
              [Op.eq]: teamName,
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
  async incrimentLosse(teamName) {
    try {
      let team = await this.getTeamByName(teamName);
      team.dataValues.LOSSES += 1;

      await Team.update(
        {
          LOSSES: team.dataValues.LOSSES,
        },
        {
          where: {
            TEAM_NAME: {
              [Op.eq]: teamName,
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
};
