const betConn = require("src/database/DBConnection/betConnection");
const { formatDateWithHour } = require("src/database/formatDate");

async function getBetByNicknameAndGameId(req, res) {
  if (req.query.secret === process.env.API_SECRET) {
    let nickname = req.query.nickname;
    let gameId = req.query.gameId;
    let bet = await betConn.getBetByUserAndGame(nickname, gameId);

    if (bet) {
      if (req.method === "PUT") {
        const updated = await betConn.update(nickname, gameId, req.body.gain);
        if (updated) {
          bet = await betConn.getBetByUserAndGame(nickname, gameId);
        }
      }
      bet.dataValues.createdAt = formatDateWithHour(bet.dataValues.createdAt);
      bet.dataValues.updatedAt = formatDateWithHour(bet.dataValues.updatedAt);
      res.json(bet);
    } else {
      res.status(500).json({
        message: "This Team name doesn't exists",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, your secret is invalid",
    });
  }
}

export default getBetByNicknameAndGameId;
