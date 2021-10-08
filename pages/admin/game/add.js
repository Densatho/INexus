import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Container, Stack, Flex } from "@chakra-ui/layout";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";
import router from "next/router";
import { adminAuth } from "src/components/authenticated";
import Sidebar from "src/components/Sidebar";
import { Select } from "@chakra-ui/react";
import DatePicker from "react-datepicker";

function gameAdd({ jwt_resp, teams, leagues }) {
  const [gameDate, setDate] = useState(new Date(Date.now()));
  const leagueRef = useRef(null);
  const team1Ref = useRef(null);
  const team2Ref = useRef(null);
  let teamsList = Object.values(teams);
  let leaguesList = Object.values(leagues);

  function renderOptionTeam(value) {
    return <option value={value.TEAM_NAME}>{value.TEAM_NAME}</option>;
  }

  function renderOptionLeague(value) {
    return <option value={value.LEAGUE_NAME}>{value.LEAGUE_NAME}</option>;
  }

  async function commit() {
    let leagueName = leagueRef.current?.value;
    let teamName1 = team1Ref.current?.value;
    let teamName2 = team2Ref.current?.value;

    if (!leagueName || !teamName1 || !teamName2) {
      return;
    }

    let resp = await fetch("/api/game/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leagueName: leagueName,
        date: gameDate,
        teamName1: teamName1,
        teamName2: teamName2,
      }),
    });
    const json = await resp.json();
    console.log(json);

    router.push("/admin/gameManager");
  }

  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  return (
    <Flex>
      <Sidebar />
      <Container
        h="450px"
        w="450px"
        textAlign="center"
        p="2.5"
        mt={16}
        shadow="1px 1px rgba(0,0,0,0.4)"
        color="white"
        borderRadius="xl"
        bgColor="#3B3B3B"
      >
        <Box fontWeight="bold" fontSize="18px">
          Criando um novo jogo:
        </Box>
        <Stack spacing={6} margin={4}>
          <form id="register">
            <FormControl>
              <FormLabel>Liga do jogo:</FormLabel>
              <Select placeholder="Selecione uma liga" ref={leagueRef}>
                {leaguesList.map(renderOptionLeague)}
              </Select>
              <FormLabel mt={2}>Time 1:</FormLabel>
              <Select placeholder="Selecione um time" ref={team1Ref}>
                {teamsList.map(renderOptionTeam)}
              </Select>
              <FormLabel mt={2}>Time 2:</FormLabel>
              <Select placeholder="Selecione um time" ref={team2Ref}>
                {teamsList.map(renderOptionTeam)}
              </Select>
              <FormLabel marginTop={2}>Data e hora do jogo:</FormLabel>
              <DatePicker
                showTimeSelect
                selected={gameDate}
                onChange={(gameDate) => setDate(gameDate)}
                dateFormat="dd/MM/yyyy HH:mm"
                name="date"
                customInput={<Input />}
              />
              <Box marginTop={4}>
                <Button
                  colorScheme="teal"
                  datainput="loginForm"
                  onClick={commit}
                >
                  Criar jogo
                </Button>
              </Box>
            </FormControl>
          </form>
        </Stack>
      </Container>
      ;
    </Flex>
  );
}

export async function getServerSideProps({ req, res }) {
  const { cookies } = req;
  const jwt_resp = await adminAuth(cookies.auth);

  const apiUrl = process.env.API_URL;
  const reqT = await fetch(apiUrl + "teams", {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });
  let teams = await reqT.json();

  const reqL = await fetch(apiUrl + "leagues", {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });
  let leagues = await reqL.json();

  return { props: { jwt_resp, teams, leagues } };
}

export default gameAdd;
