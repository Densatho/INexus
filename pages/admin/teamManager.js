import { Box, Flex } from "@chakra-ui/layout";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
const { formatDateWithHour } = require("src/database/formatDate");
import { useState } from "react";
import Link from "next/link";

function teamManager({ jwt_resp, team }) {
  const [teamsState, setTeamsState] = useState(Object.values(team));

  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  const handleDelete = async (teamName) => {
    let resp = await fetch("/api/team/" + teamName, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let respJson = await resp.json();
    if (respJson.isDeleted) {
      let newTeams = await fetch("/api/teams", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let respNewTeams = await newTeams.json();
      setTeamsState(Object.values(respNewTeams));
    }
  };

  function renderTeam(team) {
    return (
      <>
        <Tr>
          <Td>{team.TEAM_NAME}</Td>
          <Td isNumeric>{team.WINS}</Td>
          <Td isNumeric>{team.LOSSES}</Td>
          <Td>{formatDateWithHour(team.createdAt)}</Td>
          <Td>{formatDateWithHour(team.updatedAt)}</Td>
          <Td>
            {" "}
            <Link href="team/[teamName]" as={`team/${team.TEAM_NAME}`}>
              <EditIcon mr={4} cursor="pointer" />
            </Link>
            <DeleteIcon
              color="red"
              cursor="pointer"
              onClick={(e) => handleDelete(team.TEAM_NAME)}
            />
          </Td>
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
              <Th>Editar e Excluir</Th>
            </Tr>
          </Thead>
          <Tbody>{teamsState.map(renderTeam)}</Tbody>
          <TableCaption color="green">
            <Link href="team/add">
              <a>Adicionar time</a>
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
