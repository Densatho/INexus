const betConn = require("src/database/DBConnection/betConnection");
import {
  both_authenticated,
  getJwtDecoded,
} from "src/components/authenticated";

async function getAllBets(req, res) {
  const decoded = await getJwtDecoded(req);
  let nickname = decoded.sub;
  let bets = await betConn.getAll();
  let userBets = [];

  bets.forEach((bet) => {
    if (bet.USERNICKNAME === nickname) userBets.push(bet);
  });

  res.json(userBets);
}

export default both_authenticated(getAllBets);
