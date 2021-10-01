const TeamConn = require("src/database/DBConnection/teamConnection");

async function getTeamByName(req, res) {
  let teamName = req.query.teamName;
  let team = await TeamConn.getTeamByName(teamName);

  if (team) {
    if (req.method === "PUT") {
      const updated = await TeamConn.update(
        team.dataValues.TEAM_NAME,
        req.body.teamName
      );
      if (updated) {
        team = await TeamConn.getTeamByName(
          req.body.teamName ? req.body.teamName : teamName
        );
      }
    }
    res.json(team);
  } else {
    res.status(500).json({
      message: "This Team name doesn't exists",
    });
  }
}

export default getTeamByName;
