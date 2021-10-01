const UserConn = require("src/database/DBConnection/userConnection");
import { both_authenticated } from "src/components/authenticated";

async function deleteUser(req, res) {
  if (req.method === "PUT") {
    let user = await UserConn.getUserByNickname(req.body.nickname);
    if (user !== undefined) {
      let isDeleted = await UserConn.delete(user.dataValues.NICKNAME);
      let resp = {
        isDeleted: isDeleted,
      };
      res.json(resp);
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

export default both_authenticated(deleteUser);
