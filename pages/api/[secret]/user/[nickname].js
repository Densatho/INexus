const UserConn = require("src/database/DBConnection/userConnection");

async function getUserByNick(req, res) {
  if (req.query.secret === process.env.API_SECRET) {
    let nickname = req.query.nickname;
    let user = await UserConn.getUserByNickname(nickname);

    if (user) {
      if (req.method === "PUT") {
        let name = req.body.name ? req.body.name : user.dataValues.NAME;

        let lastName = req.body.lastName
          ? req.body.lastName
          : user.dataValues.LASTNAME;

        let birthday = req.body.birthday
          ? req.body.birthday
          : user.dataValues.BIRTHDAY;

        let cpf = req.body.cpf ? req.body.cpf : user.dataValues.CPF;

        let email = req.body.email ? req.body.email : user.dataValues.EMAIL;

        const updatedUser = await UserConn.updateUser(
          nickname,
          name,
          lastName,
          req.body.password,
          birthday,
          cpf,
          email
        );
        console.log(updatedUser);
      }
      res.json(user);
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
}

export default getUserByNick;
