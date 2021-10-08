const TeamConn = require("src/database/DBConnection/teamConnection");

async function getAllTeams(req, res) {
  let teams = await TeamConn.getAll();
  let teamList = [];

  teams.forEach((team) => {
    teamList.push(team.dataValues);
  });

  res.json(teamList);
}

export default getAllTeams;
