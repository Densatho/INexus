const betConn = require("src/database/DBConnection/betConnection");
import { both_authenticated } from "src/components/authenticated";

async function addBet(req, res) {
  if (req.method === "POST") {
    let bet = await betConn.getBetByUserAndGame(
      req.body.nickname,
      req.body.gameId
    );
    if (bet === undefined) {
      let isCreated = await betConn.add(
        req.body.odd,
        req.body.value,
        req.body.nickname,
        req.body.gameId,
        req.body.teamName
      );
      let resp = {
        isCreated: isCreated,
      };
      res.json(resp);
    } else {
      res.status(500).json({
        message: "This bet already exists",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept POST requests",
    });
  }
}

export default both_authenticated(addBet);
