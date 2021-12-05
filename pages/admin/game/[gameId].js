import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Container, Stack, Flex } from "@chakra-ui/layout";
import "react-datepicker/dist/react-datepicker.css";
import { useRef } from "react";
import router from "next/router";
import { adminAuth } from "src/components/authenticated";
import Sidebar from "src/components/Sidebar";
import { useState } from "react";
import { Select } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { formatDateWithHour } from "src/database/formatDate";

function leagueUpdate({ jwt_resp, leagues, teams, game }) {
  const odd1Ref = useRef(null);
  const odd2Ref = useRef(null);
  const WinTeamRef = useRef(null);
  const scoreboardRef = useRef(null);

  async function commit() {
    let leagueName = game.LEAGUELEAGUENAME;
    let teamName1 = game.TEAM1TEAMNAME;
    let teamName2 = game.TEAM2TEAMNAME;
    let odd1 = odd1Ref.current?.value || game.ODD1;
    let odd2 = odd2Ref.current?.value || game.ODD2;
    let winnerTeam = WinTeamRef.current?.value || game.WinnerTeamTEAMNAME;
    let scoreboard = scoreboardRef.current?.value;

    let resp = await fetch("/api/game/" + game.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leagueName: leagueName,
        date: game.GAME_DATE,
        teamName1: teamName1,
        teamName2: teamName2,
        scoreboard: scoreboard,
        winnerTeam: winnerTeam,
        odd1: odd1,
        odd2: odd2,
      }),
    });
    const json = await resp.json();
    console.log(json);

    if (json?.id && winnerTeam) {
      let respWinner = await fetch("/api/game/betsUpdate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId: game.id,
          winnerTeam: winnerTeam,
        }),
      });
      const jsonWinner = await respWinner.json();
      console.log(jsonWinner);

      if (jsonWinner[0]) {
        let respWinnerUsers = await fetch("/api/user/balanceUsers", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            winners: jsonWinner,
          }),
        });
        const jsonWinnerUsers = await respWinnerUsers.json();
        console.log(jsonWinnerUsers);
      }
    }

    router.push("/admin/gameManager");
  }

  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  return (
    <Flex>
      <Sidebar />
      <Container
        h="530px"
        w="450px"
        textAlign="center"
        p="2.5"
        mt={8}
        shadow="1px 1px rgba(0,0,0,0.4)"
        color="white"
        borderRadius="xl"
        bgColor="#3B3B3B"
      >
        <Box fontWeight="bold" fontSize="18px">
          <Box>Atualizando jogo</Box>
          <Box>
            {game.TEAM1TEAMNAME}: {game.ODD1} vs {game.TEAM2TEAMNAME}:{" "}
            {game.ODD2}
          </Box>
          <Box>{formatDateWithHour(game.GAME_DATE)}</Box>
        </Box>
        <Stack spacing={6} margin={4}>
          <form id="register">
            <FormControl>
              <FormLabel mt={2}>Time Vencedor:</FormLabel>
              <Select
                placeholder={game.WinnerTeamTEAMNAME || "Selecione um time"}
                ref={WinTeamRef}
              >
                <option value={game.TEAM1TEAMNAME}>{game.TEAM1TEAMNAME}</option>
                <option value={game.TEAM2TEAMNAME}>{game.TEAM2TEAMNAME}</option>
              </Select>
              <FormLabel mt={2}>Scoreboard:</FormLabel>
              <Input
                placeholder="Scoreboard"
                ref={scoreboardRef}
                defaultValue={game.SCOREBOARD}
              />
              <FormLabel mt={2}>ODD do time 1</FormLabel>
              <Input
                placeholder="ODD do time 1"
                ref={odd1Ref}
                defaultValue={game.ODD1}
              />
              <FormLabel mt={2}>ODD do time 2</FormLabel>
              <Input
                placeholder="ODD do time 2"
                ref={odd2Ref}
                defaultValue={game.ODD2}
              />
              <Box marginTop={4}>
                <Button
                  colorScheme="teal"
                  datainput="loginForm"
                  onClick={commit}
                >
                  Atualizar jogo
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

export async function getServerSideProps({ req, query }) {
  const { cookies } = req;
  const jwt_resp = await adminAuth(cookies.auth);

  const apiUrl = process.env.API_URL;
  const reqL = await fetch(apiUrl + "leagues", {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });

  let leagues = await reqL.json();

  const reqT = await fetch(apiUrl + "teams", {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });
  let teams = await reqT.json();

  let gameUrl = apiUrl + "game/" + query.gameId;
  const reqG = await fetch(gameUrl, {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });
  let game = await reqG.json();

  return { props: { jwt_resp, leagues, teams, game } };
}

export default leagueUpdate;
