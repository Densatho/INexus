const TeamConn = require("src/database/DBConnection/teamConnection");

async function incrimentWin(req, res) {
  if (req.method === "PUT") {
    if (req.query.secret === process.env.API_SECRET) {
      let team = await TeamConn.getTeamByName(req.body.teamName);
      if (team !== undefined) {
        let isIncrimented = await TeamConn.incrimentWin(
          team.dataValues.TEAM_NAME
        );
        let resp = {
          isIncrimented: isIncrimented,
        };
        res.json(resp);
      } else {
        res.status(500).json({
          message: "This team name doesn't exists",
        });
      }
    } else {
      res.status(500).json({
        message: "Sorry, your secret is invalid",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept PUT requests",
    });
  }
}

export default incrimentWin;
