import { Center, Box, Flex, Spacer, Link } from "@chakra-ui/react";
import { verify } from "jsonwebtoken";
const { formatDateWithHour } = require("src/database/formatDate");

export default function Home({ games }) {
  games = Object.values(games);

  function renderGames(game) {
    return (
      <>
        <Center mt={5}>{formatDateWithHour(game.GAME_DATE)}</Center>
        <Box
          boxShadow="base"
          h="50px"
          bg="teal"
          mx={6}
          color="white"
          borderRadius="xl"
          zIndex="0"
        >
          <Flex fontSize="16pt">
            <Box
              bg="teal.800"
              w="45%"
              borderStartRadius="xl"
              textAlign="left"
              px={4}
              pt={2}
              h="50px"
            >
              {game.TEAM1TEAMNAME}
            </Box>
            <Box
              mr={2}
              w="0"
              h="0"
              borderTop="25px solid transparent"
              borderBottom="25px solid transparent"
              borderLeft="25px solid #234e52"
              h="50px"
              bg="teal"
            ></Box>
            <Center w="25%">
              {game.ODD1} VS {game.ODD2}
            </Center>
            <Box
              ml={2}
              w="0"
              h="0"
              borderTop="25px solid transparent"
              borderBottom="25px solid transparent"
              borderRight="25px solid #234e52"
              h="50px"
            ></Box>
            <Box
              bg="teal.800"
              w="45%"
              textAlign="right"
              px={4}
              pt={2}
              borderEndRadius="xl"
              h="50px"
              zIndex="2"
            >
              {game.TEAM2TEAMNAME}
            </Box>
            <Box
              borderEndRadius="xl"
              borderStartRadius=""
              h="50px"
              bg="#2e9fc3"
              textAlign="center"
              zIndex="1"
              ml="-5"
            >
              <button>
                <Box ml="6" mt="2" mr="1">
                  <Link>APOSTAR</Link>
                </Box>
              </button>
            </Box>
          </Flex>
        </Box>
      </>
    );
  }

  return (
    <Box width="65vw" ml={32} mt={15}>
      <Center fontSize="24pt" mt={4}>
        Acontecendo Agora
      </Center>
      <Box>{games[0] ? games.map(renderGames) : "Não existe Jogos"}</Box>
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
