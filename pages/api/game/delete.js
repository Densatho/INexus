const GameConn = require("src/database/DBConnection/gamesConnection");
import { admin_authenticated } from "src/components/authenticated";

async function deleteGame(req, res) {
  if (req.method === "PUT") {
    let game = await GameConn.getGameByTeamsAndDate(
      req.body.date,
      req.body.teamName1,
      req.body.teamName2
    );
    if (game !== undefined) {
      let isDeleted = await GameConn.delete(
        req.body.date,
        req.body.teamName1,
        req.body.teamName2
      );
      let resp = {
        isDeleted: isDeleted,
      };
      res.json(resp);
    } else {
      res.status(500).json({
        message: "This game doesn't exists",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept PUT requests",
    });
  }
}

export default admin_authenticated(deleteGame);
