import { Box, Flex } from "@chakra-ui/layout";
import Sidebar from "src/components/Sidebar";
import { verify } from "jsonwebtoken";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { adminAuth } from "src/components/authenticated";

function userManager({ jwt_resp, users }) {
  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  function renderUser(user) {
    user = user[1];
    return (
      <>
        <Tr>
          <Td>{user.NICKNAME}</Td>
          <Td>{user.BALANCE}</Td>
          <Td>
            {user.NAME} {user.LASTNAME}
          </Td>
          <Td>{user.BIRTHDAY}</Td>
          <Td>{user.EMAIL}</Td>
        </Tr>
      </>
    );
  }

  if (!users[0]) {
    return (
      <Flex>
        <Sidebar />
        <p>Não há usuários cadastrados.</p>
      </Flex>
    );
  }

  return (
    <Flex>
      <Sidebar />
      <Box w="60%" ml="15%">
        <Table variant="striped" colorScheme="whatsapp">
          <TableCaption placement="top" fontWeight="bold" fontSize="22pt">
            Lista de Usuários
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Usuário</Th>
              <Th isNumeric>Saldo</Th>
              <Th>Nome Completo</Th>
              <Th>Data de Nascimento</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>{Object.entries(users).map(renderUser)}</Tbody>
        </Table>
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
