import { verify } from "jsonwebtoken";

export default async function InitialAuth({ req, res }) {
  const { cookies } = req;

  let jwt_resp = await verify(
    cookies.auth,
    process.env.JWT_ADMIN_SECRET,
    function (err, decoded) {
      if (!err && decoded) {
        return { auth: true };
      }
      return { auth: false };
    }
  );
  return { jwt_resp };
}
