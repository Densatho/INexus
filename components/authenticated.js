import { verify } from "jsonwebtoken";

export const notAuthenticated = (fn) => async (req, res) => {
  verify(
    req.cookies.auth,
    process.env.JWT_SECRET,
    async function (err, decoded) {
      if (err || !decoded) {
        return await fn(req, res);
      }
      res.status(500).json({ message: "Sorry, you are already authenticated" });
    }
  );
};

export const authenticated = (fn) => async (req, res) => {
  console.log(req.cookies);
  verify(
    req.cookies.auth,
    process.env.JWT_SECRET,
    async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res);
      }
      res.status(500).json({ message: "Sorry, you are not authenticated" });
    }
  );
};

export const admin_authenticated = (fn) => async (req, res) => {
  verify(
    req.cookies.auth,
    process.env.JWT_ADMIN_SECRET,
    async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res);
      }
      res.status(500).json({ message: "Sorry, you are not authenticated" });
    }
  );
};
