const UserConn = require("src/database/DBConnection/userConnection");
import { serialize } from "cookie";

export function clearCookie(res, cookies) {
  let cookiesConfig = [];

  cookies.forEach((cookie) => {
    cookiesConfig.push(
      serialize(cookie, "", {
        maxAge: -1,
        path: "/",
      })
    );
  });

  res.setHeader("Set-Cookie", cookiesConfig);
}

async function logoutApi(req, res) {
  if (req.method === "POST") {
    let userCookies = ["auth"];
    clearCookie(res, userCookies);

    res.json({ message: "User is logout" });
  } else {
    res.status(500).json({
      message: "Sorry, we only accept POST requests",
    });
  }
}

export default logoutApi;
