const gameConn = require("src/database/DBConnection/gamesConnection");
const { formatDateWithHour } = require("src/database/formatDate");

async function getGame(req, res) {
  let teamName1 = req.query.team1;
  let teamName2 = req.query.team2;
  let date = req.query.date;
  let game = await gameConn.getGameByTeamsAndDate(date, teamName1, teamName2);

  if (game) {
    if (req.method === "PUT") {
      const updated = await gameConn.update(
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
        game = await gameConn.getGameByTeamsAndDate(
          req.body.date ? req.body.date : date,
          req.body.teamName1 ? req.body.teamName1 : teamName1,
          req.body.teamName2 ? req.body.teamName2 : teamName2
        );
      }
    }

    game.dataValues.createdAt = formatDateWithHour(game.dataValues.createdAt);
    game.dataValues.updatedAt = formatDateWithHour(game.dataValues.updatedAt);
    game.dataValues.GAME_DATE = formatDateWithHour(game.dataValues.GAME_DATE);
    res.json(game);
  } else {
    res.status(500).json({
      message: "This game doesn't exists",
    });
  }
}

export default getGame;
