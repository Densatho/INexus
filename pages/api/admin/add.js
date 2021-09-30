const UserConn = require("src/database/DBConnection/userConnection");

async function addAdmin(req, res) {
  if (req.method === "PUT") {
    if (req.query.secret === process.env.API_SECRET) {
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
        message: "Sorry, your secret is invalid",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept PUT requests",
    });
  }
}

export default addAdmin;
