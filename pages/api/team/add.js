const TeamConn = require("src/database/DBConnection/teamConnection");
import { admin_authenticated } from "src/components/authenticated";

async function addTeam(req, res) {
  if (req.method === "POST") {
    let team = await TeamConn.getTeamByName(req.body.teamName);
    if (team === undefined) {
      let isCreated = await TeamConn.add(req.body.teamName);
      let resp = {
        isCreated: isCreated,
      };
      res.json(resp);
    } else {
      res.status(500).json({
        message: "This team name already exists",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept POST requests",
    });
  }
}

export default admin_authenticated(addTeam);
