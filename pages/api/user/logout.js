const UserConn = require("src/database/DBConnection/userConnection");
import { setCookie } from "./login";

async function logoutApi(req, res) {
  if (req.method === "POST") {
    setCookie(res, "auth", "", {
      maxAge: -1,
      path: "/",
    });

    res.json({ message: "User is logout" });
  } else {
    res.status(500).json({
      message: "Sorry, we only accept POST requests",
    });
  }
}

export default logoutApi;
