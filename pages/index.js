import { Center, Box, Flex } from "@chakra-ui/react";
import { verify } from "jsonwebtoken";
const { formatDateWithHour } = require("src/database/formatDate");

export default function Home({ games }) {
  games = Object.values(games);

  function renderGames(game) {
    return (
      <>
        <Center>{formatDateWithHour(game.GAME_DATE)}</Center>
        <Box bg="teal" mx={2} color="white">
          <Flex fontSize="16pt">
            <Box bg="teal.800" w="45%" textAlign="left" px={2}>
              {game.TEAM1TEAMNAME}
            </Box>
            <Box
              mr={2}
              w="0"
              h="0"
              borderTop="18px solid transparent"
              borderBottom="18px solid transparent"
              borderLeft="18px solid #234e52"
            ></Box>
            <Center w="10%">vs</Center>
            <Box
              ml={2}
              w="0"
              h="0"
              borderTop="18px solid transparent"
              borderBottom="18px solid transparent"
              borderRight="18px solid #234e52"
            ></Box>
            <Box bg="teal.800" w="45%" textAlign="right" px={2}>
              {game.TEAM2TEAMNAME}
            </Box>
          </Flex>
        </Box>
      </>
    );
  }

  return (
    <Box>
      <Center fontSize="24pt" mt={4}>
        Acontecendo Agora
      </Center>
      <Box mt={8} mx={12} w="50%">
        {games[0] ? games.map(renderGames) : "Não existe Jogos"}
      </Box>
    </Box>
  );
}

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

  const respGames = await fetch(process.env.API_URL + "games", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const games = await respGames.json();

  return { props: { jwt_resp, games } };
}
