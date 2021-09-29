const UserConn = require("src/database/DBConnection/userConnection");

function formatDate(date) {
  date = new Date(date);
  let formatedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return formatedDate;
}

function formatDateWithHour(date) {
  date = new Date(date);
  let formatedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}:${date.getHours()} hour(s) and ${date.getMinutes()} minute(s)`;
  return formatedDate;
}

async function getAllUsers(req, res) {
  if (req.query.secret === process.env.API_SECRET) {
    let users = await UserConn.getAll();
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

export default getAllUsers;
