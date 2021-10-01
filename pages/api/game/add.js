const gameConn = require("src/database/DBConnection/gamesConnection");
import { admin_authenticated } from "src/components/authenticated";

async function addGame(req, res) {
  if (req.method === "POST") {
    let game = await gameConn.getGameByTeamsAndDate(
      req.body.date,
      req.body.teamName1,
      req.body.teamName2
    );
    if (game === undefined) {
      let isCreated = await gameConn.add(
        req.body.date,
        req.body.leagueName,
        req.body.teamName1,
        req.body.teamName2
      );
      let resp = {
        isCreated: isCreated,
      };
      res.json(resp);
    } else {
      res.status(500).json({
        message: "This game already exists",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept POST requests",
    });
  }
}

export default admin_authenticated(addGame);
