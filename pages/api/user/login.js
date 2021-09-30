const UserConn = require("src/database/DBConnection/userConnection");
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

const setCookie = (res, name, value, options) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader(
    "Set-Cookie",
    cookie.serialize(name, String(stringValue), options)
  );
};

async function LoginApi(req, res) {
  if (req.method === "POST") {
    let user = await UserConn.getUserByNicknameLogin(req.body.nickname);
    if (user !== undefined) {
      if (
        await bcrypt.compare(req.body.password, user.dataValues.HASHED_PASSWORD)
      ) {
        const claims = {
          sub: user.NICKNAME,
          userName: user.NAME,
          userLastName: user.LASTNAME,
        };
        const jwt = sign(
          claims,
          user.IS_ADMIN ? process.env.JWT_ADMIN_SECRET : process.env.JWT_SECRET
        );

        setCookie(res, "auth", jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          path: "/",
        });

        res.json({ message: "Welcome back to the app!" });
      } else {
        res.status(500).json({
          message: "Password invalid",
        });
      }
    } else {
      res.status(500).json({
        message: "This nickname doesn't exists",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, we only accept POST requests",
    });
  }
}

export default LoginApi;
