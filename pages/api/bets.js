const betConn = require("src/database/DBConnection/betConnection");
import { both_authenticated } from "src/components/authenticated";

async function getAllBets(req, res) {
  let bets = await betConn.getAll();

  res.json(bets);
}

export default both_authenticated(getAllBets);
