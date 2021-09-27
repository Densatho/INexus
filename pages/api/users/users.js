const UserConnection = require("src/database/DBConnection/userConnection");

export default async function users(request, response) {
  if (request.method !== "GET") {
    response
      .status(500)
      .json({ message: "Sorry, we only accept GET Requests" });
  }

  let users = await UserConnection.getAllUsers();
  response.json(users);
}
