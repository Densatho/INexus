import { verify } from "jsonwebtoken";
import cookie from "cookie";

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
  const { cookies } = req;
  verify(
    cookies.auth,
    process.env.JWT_ADMIN_SECRET,
    async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res);
      }
      res.status(500).json({ message: "Sorry, you are not authenticated" });
    }
  );
};

export const both_authenticated = (fn) => async (req, res) => {
  try {
    var decoded = verify(req.cookies.auth, process.env.JWT_SECRET);
    return await fn(req, res);
  } catch (error) {
    try {
      var decoded = verify(req.cookies.auth, process.env.JWT_ADMIN_SECRET);
      return await fn(req, res);
    } catch (error) {
      res.status(500).json({ message: "Sorry, you are not authenticated" });
    }
  }
};

export async function getServerSideProps({ req, res }) {
  const { cookies } = req;
  let jwt_resp;

  jwt_resp = await verify(
    cookies.auth,
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (!err && decoded) {
        return { auth: true, decoded };
      }
      return { auth: false };
    }
  );

  if (!jwt_resp.auth) {
    jwt_resp = await verify(
      cookies.auth,
      process.env.JWT_ADMIN_SECRET,
      function (err, decoded) {
        if (!err && decoded) {
          return { auth: true, decoded };
        }
        return { auth: false };
      }
    );
  }

  return { props: { jwt_resp } };
}

export async function adminAuth(auth) {
  return await verify(
    auth,
    process.env.JWT_ADMIN_SECRET,
    function (err, decoded) {
      if (!err && decoded) {
        return { auth: true, decoded };
      }
      return { auth: false };
    }
  );
}

export async function getJwtDecoded(req) {
  const { cookies } = req;
  let jwt_resp;

  jwt_resp = await verify(
    cookies.auth,
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (!err && decoded) {
        return { auth: true, decoded };
      }
      return { auth: false };
    }
  );

  if (!jwt_resp.auth) {
    jwt_resp = await verify(
      cookies.auth,
      process.env.JWT_ADMIN_SECRET,
      function (err, decoded) {
        if (!err && decoded) {
          return { auth: true, decoded };
        }
        return { auth: false };
      }
    );
  }
  return jwt_resp.decoded;
}
