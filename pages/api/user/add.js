const UserConn = require("src/database/DBConnection/userConnection");

async function addUser(req, res) {
  if (req.method === "POST") {
    let user = await UserConn.getUserByNickname(req.body.nickname);

    if (user === undefined) {
      let isCreated = await UserConn.add(
        req.body.nickname,
        req.body.name,
        req.body.lastName,
        req.body.password,
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
    res.status(405).json({
      message: "Sorry, we only accept POST requests",
    });
  }
}

export default addUser;
