const UserConnection = require("src/database/DBConnection/userConnection");

export default async function users(req, res) {
  if (req.method === "POST") {
    const result = await UserConnection.createUser(
      req.body.nickname,
      req.body.password,
      req.body.birthday,
      req.body.cpf,
      req.body.email
    );
    console.log(result);
  }

  let users = await UserConnection.getAllUsers();
  res.json(users);
}
