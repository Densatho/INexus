import { Box, Flex } from "@chakra-ui/layout";
import Sidebar from "src/components/Sidebar";
import { verify } from "jsonwebtoken";

function userManager({ jwt_resp, users }) {
  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  function renderUser(user) {
    user = user[1];
    return (
      <li>
        User: {user.NICKNAME}, contém: R${user.BALANCE}, nome completo:{" "}
        {user.NAME} {user.LASTNAME}, dia de nascimento é {user.BIRTHDAY}, email:{" "}
        {user.EMAIL}
      </li>
    );
  }

  if (!users) {
    return (
      <Flex>
        <Sidebar />
        <p>Não tem usuários</p>
      </Flex>
    );
  }

  return (
    <Flex>
      <Sidebar />
      <Box w="60vw" margin={12}>
        <p>Aqui vai a lista de usuários</p>
        <ul>{Object.entries(users).map(renderUser)}</ul>
      </Box>
    </Flex>
  );
}

userManager.getInitialProps = async ({ req, res }) => {
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

  const reqU = await fetch(process.env.API_URL + "users", {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });
  let users = await reqU.json();

  return { jwt_resp, users };
};

export default userManager;
