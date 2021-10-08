const TeamConn = require("src/database/DBConnection/teamConnection");

async function getTeamByName(req, res) {
  let teamName = req.query.teamName;
  let team = await TeamConn.getTeamByName(teamName);
  let isDeleted;

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
    } else if (req.method === "DELETE") {
      isDeleted = TeamConn.delete(teamName);
    }
    res.json(!isDeleted ? team : { isDeleted: isDeleted });
  } else {
    res.status(500).json({
      message: "This Team name doesn't exists",
    });
  }
}

export default getTeamByName;
