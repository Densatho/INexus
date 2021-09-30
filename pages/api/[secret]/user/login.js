const UserConn = require("src/database/DBConnection/userConnection");
import bcrypt from "bcryptjs";

async function LoginApi(req, res) {
  if (req.method === "POST") {
    if (req.query.secret === process.env.API_SECRET) {
      let user = await UserConn.getUserByNicknameLogin(req.body.nickname);
      if (user !== undefined) {
        if (
          await bcrypt.compare(
            req.body.password,
            user.dataValues.HASHED_PASSWORD
          )
        ) {
          res.json(user);
        } else {
          res.status(500).json({
            message: "Password invalid",
          });
        }
      } else {
        res.status(500).json({
          message: "This nickname doesn't exists",
        });
      }
    } else {
      res.status(500).json({
        message: "Sorry, your secret is invalid",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept PUT requests",
    });
  }
}

export default LoginApi;
