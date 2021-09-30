const betConn = require("src/database/DBConnection/betConnection");

async function addBet(req, res) {
  if (req.method === "PUT") {
    if (req.query.secret === process.env.API_SECRET) {
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
        message: "Sorry, your secret is invalid",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept PUT requests",
    });
  }
}

export default addBet;
