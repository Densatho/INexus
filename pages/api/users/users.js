const UserConnection = require("src/database/DBConnection/userConnection");

async function users(request, response) {
  try {
    let users = await UserConnection.getAllUsers();
    response.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");
    response.json(users);
  } catch (error) {
    console.log(error);
  }
}

export default users;
