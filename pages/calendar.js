import { Center, Box, Flex, Spacer } from "@chakra-ui/react";
import { verify } from "jsonwebtoken";
const { formatDateWithHour } = require("src/database/formatDate");

export default function Calendar({ games }) {
  games = Object.values(games);
  console.log(games);

  function renderGames(game) {
    return (
      <Box
        bg="#E5E5E5"
        m={4}
        b={2}
        borderColor="twitter.100"
        w="200px"
        h="60px"
      >
        <Center fontSize="16pt">
          {game.TEAM1TEAMNAME} X {game.TEAM2TEAMNAME}
        </Center>
        <Center>{formatDateWithHour(game.GAME_DATE)}</Center>
      </Box>
    );
  }

  if (!games[0]) {
    return <></>;
  }
  return (
    <Box>
      <Center fontSize="24pt" mt={4}>
        Calendário de jogos
      </Center>
      <Flex mt={8} mx={12}>
        {games.map(renderGames)}
      </Flex>
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
