const UserConn = require("src/database/DBConnection/userConnection");

async function LoginApi(req, res) {
  if (req.query.secret === process.env.API_SECRET) {
    let testeResp = await fetch(
      "http://localhost:3000/api/ga49PCgsv34eJ%5E%3Cv/user/shollzz",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "Lucas Henrique" }),
      }
    );
    res.json(await testeResp.json());
  } else {
    res.status(500).json({
      message: "Sorry, your secret is invalid",
    });
  }
}

export default LoginApi;
