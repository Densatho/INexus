const GameConn = require("src/database/DBConnection/gamesConnection");

async function deleteGame(req, res) {
  if (req.method === "PUT") {
    if (req.query.secret === process.env.API_SECRET) {
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
        message: "Sorry, your secret is invalid",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept PUT requests",
    });
  }
}

export default deleteGame;
