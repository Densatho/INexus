const UserConn = require("src/database/DBConnection/userConnection");
import { admin_authenticated } from "src/components/authenticated";

async function getAllUsers(req, res) {
  let users = await UserConn.getAll();
  let usersList = [];

  users.forEach((user) => {
    usersList.push(user.dataValues);
  });

  res.json(usersList);
}

export default admin_authenticated(getAllUsers);
