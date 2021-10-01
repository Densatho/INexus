const UserConn = require("src/database/DBConnection/userConnection");
import { admin_authenticated } from "src/components/authenticated";

async function addAdmin(req, res) {
  if (req.method === "POST") {
    let nickname = req.body.nickname;
    let user = await UserConn.getUserByNickname(nickname);

    if (user !== undefined) {
      if (!(await UserConn.isAdmin(nickname))) {
        let isCreated = await UserConn.addAdmin(nickname);
        let resp = {
          isCreated: isCreated,
        };
        res.json(resp);
      } else {
        res.status(500).json({
          message: "This account already admin",
        });
      }
    } else {
      res.status(500).json({
        message: "This nickname doesn't exists",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept POST requests",
    });
  }
}

export default admin_authenticated(addAdmin);
