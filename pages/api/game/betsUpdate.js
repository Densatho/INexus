const betsConn = require("src/database/DBConnection/betConnection");
import { admin_authenticated } from "src/components/authenticated";

async function betsUpdate(req, res) {
  if (req.method === "PUT") {
    const gameId = req.body.gameId;
    const winnerTeam = req.body.winnerTeam;
    let update = await betsConn.updateWinners(gameId, winnerTeam);
    if (update) {
      let result = await betsConn.getBetsByGameIdAndWinnerTeam(
        gameId,
        winnerTeam
      );
      res.json(result);
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept PUT requests",
    });
  }
}

export default admin_authenticated(betsUpdate);
