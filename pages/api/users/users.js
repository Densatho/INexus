const UserConnection = require("src/database/DBConnection/userConnection");

async function users(request, response) {
  let users = await UserConnection.getAllUsers();
  response.json(users);
}

export default users;
