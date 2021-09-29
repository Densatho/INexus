const UserConn = require("src/database/DBConnection/userConnection");

async function LoginApi(req, res) {
  if (req.method === "PUT") {
    if (req.query.secret === process.env.API_SECRET) {
      console.log(req.body);
      let user = await UserConn.getUserByNicknameLogin(req.body.nickname);
      if (user !== undefined) {
        if (user.login(req.body.password)) {
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
