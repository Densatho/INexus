import { Box, Flex } from "@chakra-ui/layout";
import Sidebar from "src/components/Sidebar";
import { verify } from "jsonwebtoken";
import { adminAuth } from "src/components/authenticated";

function betManager({ jwt_resp, bets }) {
  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  function renderBet(bet) {
    bet = bet[1];
    return (
      <li>
        bet: dono da aposta: {bet.USERNICKNAME}, id do jogo: {bet.GAMEId}, odd:{" "}
        {bet.ODDS}, valor: {bet.BET_VALUE}, {bet.GAIN ? "ganhou" : "perdeu"},
        time apostado: {bet.TEAMTEAMNAME}{" "}
      </li>
    );
  }

  if (!bets[0]) {
    return (
      <Flex>
        <Sidebar />
        <p>Não tem apostas</p>
      </Flex>
    );
  }

  return (
    <Flex>
      <Sidebar />
      <Box w="60vw" margin={12}>
        <p>Aqui vai a lista de apostas</p>
        <ul>{Object.entries(bets).map(renderBet)}</ul>
      </Box>
    </Flex>
  );
}

export async function getServerSideProps({ req, res }) {
  const { cookies } = req;
  const jwt_resp = await adminAuth(cookies.auth);

  const reqU = await fetch(process.env.API_URL + "bets", {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });
  let bets = await reqU.json();

  return { props: { jwt_resp, bets } };
}

export default betManager;
