const betConn = require("src/database/DBConnection/betConnection");
import {
  both_authenticated,
  getJwtDecoded,
} from "src/components/authenticated";

async function addBet(req, res) {
  var decoded = await getJwtDecoded(req);
  console.log(decoded);

  if (req.method === "POST") {
    let bet = await betConn.getBetByUserAndGame(decoded.sub, req.body.gameId);
    if (bet === undefined) {
      if (req.body.value <= decoded.balance && req.body.value > 0) {
        let isCreated = await betConn.add(
          req.body.odd,
          req.body.value,
          decoded.sub,
          req.body.gameId,
          req.body.teamName
        );
        let resp = {
          isCreated: isCreated,
        };
        res.json(resp);
      } else {
        res.status(500).json({
          message: "Your balance is less than bet amount",
        });
      }
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
