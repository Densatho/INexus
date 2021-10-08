const gameConn = require("src/database/DBConnection/gamesConnection");

async function getAllGames(req, res) {
  let games = await gameConn.getAll();
  let gameList = [];

  games.forEach((game) => {
    gameList.push(game.dataValues);
  });

  res.json(gameList);
}

export default getAllGames;
