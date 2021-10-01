const UserConn = require("src/database/DBConnection/userConnection");
import { admin_authenticated } from "src/components/authenticated";

async function delAdmin(req, res) {
  if (req.method === "PUT") {
    let nickname = req.body.nickname;
    let user = await UserConn.getUserByNickname(nickname);

    if (user !== undefined) {
      if (await UserConn.isAdmin(nickname)) {
        let isDelete = await UserConn.deleteAdmin(nickname);
        let resp = {
          isDelete: isDelete,
        };
        res.json(resp);
      } else {
        res.status(500).json({
          message: "This account isn't an admin",
        });
      }
    } else {
      res.status(500).json({
        message: "This nickname doesn't exists",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept PUT requests",
    });
  }
}

export default admin_authenticated(delAdmin);
