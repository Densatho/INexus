const UserConn = require("src/database/DBConnection/userConnection");
import {
  both_authenticated,
  getJwtDecoded,
} from "src/components/authenticated";
import { sign } from "jsonwebtoken";
import { setCookie } from "./login";

async function updateBalance(req, res) {
  const decoded = await getJwtDecoded(req);
  let nickname = decoded.sub;
  let user = await UserConn.getUserByNickname(nickname);

  if (user) {
    if (req.method === "PUT") {
      let balance = parseFloat(user.BALANCE) + parseFloat(req.body.amount);

      const updatedUser = await UserConn.updateBalance(nickname, balance);
      user = await UserConn.getUserByNicknameLogin(nickname);

      const claims = {
        sub: user.NICKNAME,
        userName: user.NAME,
        userLastName: user.LASTNAME,
        balance: user.BALANCE,
        isAdmin: user.IS_ADMIN,
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

      res.json({ message: "Balance update is a sucess" });
    } else {
      res.status(500).json({
        message: "We only accept PUT requests",
      });
    }
  } else {
    res.status(500).json({
      message: "This nickname doesn't exists",
    });
  }
}

export default both_authenticated(updateBalance);
