const UserConn = require("src/database/DBConnection/userConnection");
const { formatDate, formatDateWithHour } = require("src/database/formatDate");
import { admin_authenticated } from "src/components/authenticated";

async function getAllAdmins(req, res) {
  let users = await UserConn.getAllAdmins();
  let usersList = [];

  users.forEach((user) => {
    user.dataValues.BIRTHDAY = formatDate(user.dataValues.BIRTHDAY);
    user.dataValues.createdAt = formatDateWithHour(user.dataValues.createdAt);
    user.dataValues.updatedAt = formatDateWithHour(user.dataValues.updatedAt);
    usersList.push(user.dataValues);
  });

  res.json(usersList);
}

export default admin_authenticated(getAllAdmins);
