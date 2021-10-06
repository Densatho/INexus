import { Box, Flex } from "@chakra-ui/layout";
import Sidebar from "src/components/Sidebar";
import { verify } from "jsonwebtoken";
import { adminAuth } from "src/components/authenticated";

function teamManager({ jwt_resp, team }) {
  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  function renderTeam(team) {
    team = team[1];
    return (
      <li>
        Time: {team.TEAM_NAME}, vitorias: {team.WINS}, derrotas: {team.LOSSES},
        criado em {team.createdAt}, atualizado em: {team.updatedAt}
      </li>
    );
  }

  if (!team[0]) {
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
        <p>Aqui vai a lista de times</p>
        <ul>{Object.entries(team).map(renderTeam)}</ul>
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
