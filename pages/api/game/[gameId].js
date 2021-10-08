const gameConn = require("src/database/DBConnection/gamesConnection");
const { formatDateWithHour } = require("src/database/formatDate");

async function getGame(req, res) {
  let id = req.query.id;
  let teamName1 = req.query.team1;
  let teamName2 = req.query.team2;
  let date = req.query.date;
  let game = await gameConn.getGameById(id);
  let isDeleted;

  if (game) {
    if (req.method === "PUT") {
      const updated = await gameConn.update(
        id,
        date,
        req.body.scoreboard,
        req.body.leagueName,
        teamName1,
        teamName2,
        req.body.date,
        req.body.newLeagueName,
        req.body.teamName1,
        req.body.teamName2
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
