const UserConnection = require("src/database/DBConnection/userConnection");

async function users(request, response) {
  try {
    let users = await UserConnection.getAllUsers();
    response.json(users);
  } catch (error) {
    console.log(error);
  }
}

export default users;
