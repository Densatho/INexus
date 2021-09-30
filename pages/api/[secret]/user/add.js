const UserConn = require("src/database/DBConnection/userConnection");
const bcrypt = require("bcryptjs");

async function addUser(req, res) {
  if (req.method === "PUT") {
    if (req.query.secret === process.env.API_SECRET) {
      let user = await UserConn.getUserByNickname(req.body.nickname);
      let hashed_password = bcrypt.hashSync(req.body.password, 10);

      if (user === undefined) {
        let isCreated = await UserConn.add(
          req.body.nickname,
          req.body.name,
          req.body.lastName,
          hashed_password,
          req.body.birthday,
          req.body.cpf,
          req.body.email
        );
        let resp = {
          isCreated: isCreated,
        };
        res.json(resp);
      } else {
        res.status(500).json({
          message: "This nickname already exists",
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

export default addUser;
