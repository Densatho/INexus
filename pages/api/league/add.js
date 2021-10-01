const LeagueConn = require("src/database/DBConnection/leagueConnection");
import { admin_authenticated } from "src/components/authenticated";

async function addLeague(req, res) {
  if (req.method === "POST") {
    let league = await LeagueConn.getLeagueByName(req.body.leagueName);
    if (league === undefined) {
      let isCreated = await LeagueConn.add(
        req.body.leagueName,
        req.body.region
      );
      let resp = {
        isCreated: isCreated,
      };
      res.json(resp);
    } else {
      res.status(500).json({
        message: "This League name already exists",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept POST requests",
    });
  }
}

export default admin_authenticated(addLeague);
