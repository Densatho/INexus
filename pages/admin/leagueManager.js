import { Box, Flex } from "@chakra-ui/layout";
import Sidebar from "src/components/Sidebar";
import { adminAuth } from "src/components/authenticated";
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
import { EmailIcon } from "@chakra-ui/icon";
function leagueManager({ jwt_resp, leagues }) {
  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  function renderLeague(league) {
    league = league[1];
    return (
      <>
        <Tr>
          <Td>{league.LEAGUE_NAME}</Td>
          <Td>{league.REGION}</Td>
          <Td>{league.createdAt}</Td>
          <Td>{league.updatedAt}</Td>
        </Tr>
      </>
    );
  }

  if (!leagues[0]) {
    return (
      <Flex>
        <Sidebar />
        <p>Não há ligas cadastradas.</p>
      </Flex>
    );
  }

  return (
    <Flex>
      <Sidebar />
      <Box w="60%" ml="15%">
        <Table variant="striped" colorScheme="whatsapp">
          <TableCaption placement="top" fontWeight="bold" fontSize="22pt">
            Lista de Ligas
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Liga</Th>
              <Th>País</Th>
              <Th>Data de Criação</Th>
              <Th>Data de Alteração</Th>
            </Tr>
          </Thead>
          <Tbody>{Object.entries(leagues).map(renderLeague)}</Tbody>
        </Table>
      </Box>
    </Flex>
  );
}

export async function getServerSideProps({ req, res }) {
  const { cookies } = req;
  const jwt_resp = await adminAuth(cookies.auth);

  const reqT = await fetch(process.env.API_URL + "leagues", {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });
  let leagues = await reqT.json();

  return { props: { jwt_resp, leagues } };
}

export default leagueManager;
