const betConn = require("src/database/DBConnection/betConnection");
const { formatDateWithHour } = require("src/database/formatDate");
import { both_authenticated } from "src/components/authenticated";

async function getAllBets(req, res) {
  let bets = await betConn.getAll();
  let betList = [];

  bets.forEach((bet) => {
    bet.dataValues.createdAt = formatDateWithHour(bet.dataValues.createdAt);
    bet.dataValues.updatedAt = formatDateWithHour(bet.dataValues.updatedAt);
    betList.push(bet.dataValues);
  });

  res.json(betList);
}

export default both_authenticated(getAllBets);
