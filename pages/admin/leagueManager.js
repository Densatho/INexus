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
import Link from "next/link";
import { useState } from "react";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";

function leagueManager({ jwt_resp, leagues }) {
  const [leaguesList, setLeagues] = useState(Object.values(leagues));

  const handleDelete = async (leagueName) => {
    let resp = await fetch("/api/league/" + leagueName, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let respJson = await resp.json();
    console.log(respJson);
    if (respJson.isDeleted) {
      let newLeagues = await fetch("/api/leagues", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let respNewLeagues = await newLeagues.json();
      setLeagues(Object.values(respNewLeagues));
    }
  };

  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  function renderLeague(league) {
    return (
      <>
        <Tr>
          <Td>{league.LEAGUE_NAME}</Td>
          <Td>{league.REGION}</Td>
          <Td>{league.createdAt}</Td>
          <Td>{league.updatedAt}</Td>
          <Td>
            {" "}
            <Link
              href="league/[leagueName]"
              as={`league/${league.LEAGUE_NAME}`}
            >
              <EditIcon mr={4} cursor="pointer" />
            </Link>
            <DeleteIcon
              color="red"
              cursor="pointer"
              onClick={(e) => handleDelete(league.LEAGUE_NAME)}
            />
          </Td>
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
              <Th>Editar e Excluir</Th>
            </Tr>
          </Thead>
          <Tbody>{leaguesList.map(renderLeague)}</Tbody>
          <TableCaption color="green">
            <Link href="league/add">
              <a>Adicionar liga</a>
            </Link>
          </TableCaption>
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
