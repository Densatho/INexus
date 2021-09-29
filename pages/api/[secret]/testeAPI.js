const UserConn = require("src/database/DBConnection/userConnection");

async function LoginApi(req, res) {
  if (req.query.secret === process.env.API_SECRET) {
    const url = process.env.API_URL + process.env.API_SECRET + "/team/incLosse";
    let testeResp = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamName: "pain gaming",
      }),
    });
    res.json(await testeResp.json());
  } else {
    res.status(500).json({
      message: "Sorry, your secret is invalid",
    });
  }
}

export default LoginApi;
