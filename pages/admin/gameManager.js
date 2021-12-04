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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
const { formatDateWithHour } = require("src/database/formatDate");

function gameManager({ jwt_resp, games }) {
  const [gamesList, setGames] = useState(Object.values(games));

  const handleDelete = async (gameId) => {
    console.log(gameId);
    let resp = await fetch("/api/game/" + gameId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let respJson = await resp.json();
    console.log(respJson);
    if (respJson.isDeleted) {
      let newGames = await fetch("/api/games", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let respNewGames = await newGames.json();
      setGames(Object.values(respNewGames));
    }
  };

  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  function renderGame(game) {
    return (
      <>
        <Tr>
          <Td>{formatDateWithHour(game.GAME_DATE)}</Td>
          <Td>{game.SCOREBOARD}</Td>
          <Td>{game.TEAM1TEAMNAME}</Td>
          <Td>{game.ODD1}</Td>
          <Td>{game.TEAM2TEAMNAME}</Td>
          <Td>{game.ODD2}</Td>
          <Td>{game.WinnerTeamTEAMNAME}</Td>
          <Td>
            {" "}
            <Link href="game/[gameId]" as={`game/${game.id}`}>
              <EditIcon mr={4} cursor="pointer" />
            </Link>
            <DeleteIcon
              color="red"
              cursor="pointer"
              onClick={(e) => handleDelete(game.id)}
            />
          </Td>
        </Tr>
      </>
    );
  }

  if (!games[0]) {
    return (
      <Flex>
        <Sidebar />
        <p>Não há jogos cadastradas.</p>
      </Flex>
    );
  }

  return (
    <Flex>
      <Sidebar />
      <Box w="60%" ml="15%">
        <Table variant="striped" colorScheme="whatsapp">
          <TableCaption placement="top" fontWeight="bold" fontSize="22pt">
            Lista de Jogos
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Data do jogo</Th>
              <Th>Placar</Th>
              <Th>Time 1</Th>
              <Th>Odds 1</Th>
              <Th>Time 2</Th>
              <Th>Odds 2</Th>
              <Th>Vencedor</Th>
              <Th>Editar e Excluir</Th>
            </Tr>
          </Thead>
          <Tbody>{gamesList.map(renderGame)}</Tbody>
          <TableCaption color="green">
            <Link href="game/add">
              <a>Adicionar jogo</a>
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

  const reqT = await fetch(process.env.API_URL + "games", {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });
  let games = await reqT.json();

  return { props: { jwt_resp, games } };
}

export default gameManager;
