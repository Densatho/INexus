const betConn = require("src/database/DBConnection/betConnection");

async function deleteBet(req, res) {
  if (req.method === "PUT") {
    if (req.query.secret === process.env.API_SECRET) {
      let bet = await betConn.getBetByUserAndGame(
        req.body.nickname,
        req.body.gameId
      );
      if (bet !== undefined) {
        let isDeleted = await betConn.delete(bet.dataValues.id);
        let resp = {
          isDeleted: isDeleted,
        };
        res.json(resp);
      } else {
        res.status(500).json({
          message: "This bet doesn't exists",
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

export default deleteBet;
