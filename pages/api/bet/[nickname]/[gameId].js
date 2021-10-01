const betConn = require("src/database/DBConnection/betConnection");
const { formatDateWithHour } = require("src/database/formatDate");

async function getBetByNicknameAndGameId(req, res) {
  let nickname = req.query.nickname;
  let gameId = req.query.gameId;
  let bet = await betConn.getBetByUserAndGame(nickname, parseInt(gameId));

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
      message: "This bet doesn't exists",
    });
  }
}

export default getBetByNicknameAndGameId;
