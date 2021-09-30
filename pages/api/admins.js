const UserConn = require("src/database/DBConnection/userConnection");
const { formatDate, formatDateWithHour } = require("src/database/formatDate");

async function getAllAdmins(req, res) {
  if (req.query.secret === process.env.API_SECRET) {
    let users = await UserConn.getAllAdmins();
    let usersList = [];

    users.forEach((user) => {
      user.dataValues.BIRTHDAY = formatDate(user.dataValues.BIRTHDAY);
      user.dataValues.createdAt = formatDateWithHour(user.dataValues.createdAt);
      user.dataValues.updatedAt = formatDateWithHour(user.dataValues.updatedAt);
      usersList.push(user.dataValues);
    });

    res.json(usersList);
  } else {
    res.status(500).json({
      message: "Sorry, your secret is invalid",
    });
  }
}

export default getAllAdmins;
