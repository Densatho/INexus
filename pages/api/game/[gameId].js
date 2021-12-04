const gameConn = require("src/database/DBConnection/gamesConnection");

async function getGame(req, res) {
  let id = req.query.gameId;
  let game = await gameConn.getGameById(id);
  let isDeleted;

  if (game) {
    if (req.method === "PUT") {
      const updated = await gameConn.update(
        id,
        req.body.scoreboard,
        req.body.date,
        req.body.leagueName,
        req.body.teamName1,
        req.body.odd1,
        req.body.teamName2,
        req.body.odd2,
        req.body.winnerTeam
      );
      if (updated) {
        game = await gameConn.getGameById(id);
      }
    } else if (req.method === "DELETE") {
      isDeleted = await gameConn.delete(id);
    }
    res.json(!isDeleted ? game : { isDeleted: isDeleted });
  } else {
    res.status(500).json({
      message: "This game doesn't exists",
    });
  }
}

export default getGame;
