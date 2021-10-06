import { Box, Flex } from "@chakra-ui/layout";
import Sidebar from "src/components/Sidebar";
import { adminAuth } from "src/components/authenticated";

function leagueManager({ jwt_resp, leagues }) {
  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  function renderLeague(league) {
    league = league[1];
    return (
      <li>
        League: {league.TEAM_NAME}, vitorias: {league.WINS}, derrotas:{" "}
        {league.LOSSES}, criado em {league.createdAt}, atualizado em:{" "}
        {league.updatedAt}
      </li>
    );
  }

  if (!leagues[0]) {
    return (
      <Flex>
        <Sidebar />
        <p>Não tem times</p>
      </Flex>
    );
  }

  return (
    <Flex>
      <Sidebar />
      <Box w="60vw" margin={12}>
        <p>Aqui vai a lista de ligas</p>
        <ul>{Object.entries(leagues).map(renderLeague)}</ul>
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
  let leagues = await reqT.json();

  return { props: { jwt_resp, leagues } };
}

export default leagueManager;
