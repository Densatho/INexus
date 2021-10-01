const TeamConn = require("src/database/DBConnection/teamConnection");
const { formatDateWithHour } = require("src/database/formatDate");

async function getAllTeams(req, res) {
  let teams = await TeamConn.getAll();
  let teamList = [];

  teams.forEach((team) => {
    team.dataValues.createdAt = formatDateWithHour(team.dataValues.createdAt);
    team.dataValues.updatedAt = formatDateWithHour(team.dataValues.updatedAt);
    teamList.push(team.dataValues);
  });

  res.json(teamList);
}

export default getAllTeams;
