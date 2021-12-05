import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import Sidebar from "src/components/Sidebar";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { adminAuth } from "src/components/authenticated";
import { formatDate } from "src/database/formatDate";
import { useState } from "react";

function userManager({ jwt_resp, users }) {
  const [usersList, setUsersState] = useState(Object.values(users));

  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  const handleDelete = async (nickname) => {
    let resp = await fetch("/api/user/" + nickname, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let respJson = await resp.json();
    if (respJson.isDeleted) {
      let newUsers = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let respNewUsers = await newUsers.json();
      setUsersState(Object.values(respNewUsers));
    }
  };

  function renderUser(user) {
    return (
      <>
        <Tr>
          <Td>{user.NICKNAME}</Td>
          <Td isNumeric>{user.BALANCE}</Td>
          <Td>
            {user.NAME} {user.LASTNAME}
          </Td>
          <Td>{formatDate(user.BIRTHDAY)}</Td>
          <Td>{user.EMAIL}</Td>
          <Td>
            <DeleteIcon
              color="red"
              cursor="pointer"
              ml={4}
              onClick={(e) => handleDelete(user.NICKNAME)}
            />
          </Td>
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
              <Th>Excluir</Th>
            </Tr>
          </Thead>
          <Tbody>{usersList.map(renderUser)}</Tbody>
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
