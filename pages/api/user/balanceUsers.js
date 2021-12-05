const UserConn = require("src/database/DBConnection/userConnection");
import { admin_authenticated } from "src/components/authenticated";

async function updateBalance(req, res) {
  const winners = Object.values(req.body.winners);
  console.log(winners);
  winners.forEach(async (winner) => {
    let user = await UserConn.getUserByNickname(winner.USERNICKNAME);
    let balance =
      parseFloat(user.BALANCE) +
      parseFloat(winner.BET_VALUE) * parseFloat(winner.ODDS);
    const updatedUser = await UserConn.updateBalance(user.NICKNAME, balance);
  });

  res.json(true);
}

export default admin_authenticated(updateBalance);
