const gameConn = require("src/database/DBConnection/gamesConnection");
const { formatDateWithHour } = require("src/database/formatDate");

async function getAllGames(req, res) {
  if (req.query.secret === process.env.API_SECRET) {
    let games = await gameConn.getAll();
    let gameList = [];

    games.forEach((game) => {
      game.dataValues.createdAt = formatDateWithHour(game.dataValues.createdAt);
      game.dataValues.updatedAt = formatDateWithHour(game.dataValues.updatedAt);
      game.dataValues.GAME_DATE = formatDateWithHour(game.dataValues.GAME_DATE);
      gameList.push(game.dataValues);
    });

    res.json(gameList);
  } else {
    res.status(500).json({
      message: "Sorry, your secret is invalid",
    });
  }
}

export default getAllGames;
