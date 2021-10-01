const UserConn = require("src/database/DBConnection/userConnection");
const { formatDateWithHour, formatDate } = require("src/database/formatDate");
import bcrypt from "bcryptjs";
import { both_authenticated } from "src/components/authenticated";

async function getUserByNick(req, res) {
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
      let hashed_password = req.body.password
        ? bcrypt.hashSync(req.body.password, 10)
        : req.body.password;

      let balance = req.body.balance;

      const updatedUser = await UserConn.update(
        nickname,
        name,
        lastName,
        hashed_password,
        birthday,
        cpf,
        email,
        balance
      );
      if (updatedUser) {
        user = await UserConn.getUserByNickname(nickname);
      }
    }
    user.dataValues.createdAt = formatDateWithHour(user.dataValues.createdAt);
    user.dataValues.updatedAt = formatDateWithHour(user.dataValues.updatedAt);
    user.dataValues.BIRTHDAY = formatDate(user.dataValues.BIRTHDAY);
    res.json(user);
  } else {
    res.status(500).json({
      message: "This nickname doesn't exists",
    });
  }
}

export default both_authenticated(getUserByNick);
