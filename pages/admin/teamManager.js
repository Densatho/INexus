import { Box, Flex } from "@chakra-ui/layout";
import Sidebar from "src/components/Sidebar";
import { adminAuth } from "src/components/authenticated";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

function teamManager({ jwt_resp, team }) {
  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  function renderTeam(team) {
    team = team[1];
    return (
      <>
        <Tr>
          <Td>{team.TEAM_NAME}</Td>
          <Td isNumeric>{team.WINS}</Td>
          <Td isNumeric>{team.LOSSES}</Td>
          <Td>{team.createdAt}</Td>
          <Td>{team.updatedAt}</Td>
        </Tr>
      </>
    );
  }

  if (!team[0]) {
    return (
      <Flex>
        <Sidebar />
        <p>Não há times cadastrados.</p>
      </Flex>
    );
  }

  return (
    <Flex>
      <Sidebar />
      <Box w="60%" ml="15%">
        <Table variant="striped" colorScheme="whatsapp">
          <TableCaption placement="top" fontWeight="bold" fontSize="22pt">
            Lista de Times
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Time</Th>
              <Th isNumeric>Vitórias</Th>
              <Th isNumeric>Derrotas</Th>
              <Th>Data de Criação</Th>
              <Th>Data de Alteração</Th>
            </Tr>
          </Thead>
          <Tbody>{Object.entries(team).map(renderTeam)}</Tbody>
        </Table>
      </Box>
    </Flex>
  );
}

export async function getServerSideProps({ req, res }) {
  const { cookies } = req;
  const jwt_resp = await adminAuth(cookies.auth);

  const reqT = await fetch(process.env.API_URL + "teams", {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });
  let team = await reqT.json();

  return { props: { jwt_resp, team } };
}

export default teamManager;
