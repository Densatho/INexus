import { Box, Flex } from "@chakra-ui/layout";
import Sidebar from "src/components/Sidebar";
import { verify } from "jsonwebtoken";
import { adminAuth } from "src/components/authenticated";

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

  if (!users[0]) {
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
      <Box w="60vw" margin={12} bgColor="red">
        <p>Aqui vai a lista de usuários</p>
        <ul>{Object.entries(users).map(renderUser)}</ul>
      </Box>
    </Flex>
  );
}

export async function getServerSideProps({ req, res }) {
  const { cookies } = req;
  const jwt_resp = await adminAuth(cookies.auth);

  const reqU = await fetch(process.env.API_URL + "users", {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });
  let users = await reqU.json();

  return { props: { jwt_resp, users } };
}

export default userManager;
