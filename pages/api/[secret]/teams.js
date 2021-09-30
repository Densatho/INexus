const TeamConn = require("src/database/DBConnection/teamConnection");
const { formatDateWithHour } = require("src/database/formatDate");

async function getAllTeams(req, res) {
  if (req.query.secret === process.env.API_SECRET) {
    let teams = await TeamConn.getAll();
    let teamList = [];

    teams.forEach((team) => {
      team.dataValues.createdAt = formatDateWithHour(team.dataValues.createdAt);
      team.dataValues.updatedAt = formatDateWithHour(team.dataValues.updatedAt);
      teamList.push(team.dataValues);
    });

    res.json(teamList);
  } else {
    res.status(500).json({
      message: "Sorry, your secret is invalid",
    });
  }
}

export default getAllTeams;
