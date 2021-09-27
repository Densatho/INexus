const UserConnection = require("src/database/DBConnection/userConnection");

async function users(request, response) {
  let users = await UserConnection.getAllUsers();

  response.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");

  response.json(users);
}

export default users;
