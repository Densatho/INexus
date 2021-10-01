const TeamConn = require("src/database/DBConnection/teamConnection");
import { admin_authenticated } from "src/components/authenticated";

async function incrimentLosse(req, res) {
  if (req.method === "PUT") {
    let team = await TeamConn.getTeamByName(req.body.teamName);
    if (team !== undefined) {
      let isIncrimented = await TeamConn.incrimentLosse(
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
      message: "Sorry, we only accept PUT requests",
    });
  }
}

export default admin_authenticated(incrimentLosse);
