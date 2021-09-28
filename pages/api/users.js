const UserConn = require("src/database/DBConnection/userConnection");

async function getAllUsers(req, res) {
  let users = await UserConn.getAllUsers();
  let usersList = [];

  users.forEach((user) => {
    let birthday = new Date(`${user.dataValues.BIRTHDAY}`);
    user.dataValues.BIRTHDAY = `${birthday.getDate()}/${
      birthday.getMonth() + 1
    }/${birthday.getFullYear()}`;
    usersList.push(user.dataValues);
  });

  res.json(usersList);
}

export default getAllUsers;
