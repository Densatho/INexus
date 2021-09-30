const betConn = require("src/database/DBConnection/betConnection");
const { formatDateWithHour } = require("src/database/formatDate");

async function getAllBets(req, res) {
  if (req.query.secret === process.env.API_SECRET) {
    let bets = await betConn.getAll();
    let betList = [];

    bets.forEach((bet) => {
      bet.dataValues.createdAt = formatDateWithHour(bet.dataValues.createdAt);
      bet.dataValues.updatedAt = formatDateWithHour(bet.dataValues.updatedAt);
      betList.push(bet.dataValues);
    });

    res.json(betList);
  } else {
    res.status(500).json({
      message: "Sorry, your secret is invalid",
    });
  }
}

export default getAllBets;
