import { Box, Container, Stack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/number-input";
import { Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { verify } from "jsonwebtoken";
import { formatDateWithHour } from "src/database/formatDate";
import { useRef } from "react";
import router from "next/router";

export default function gameId({ game, balance }) {
  const amountRef = useRef(null);
  const teamRef = useRef(null);

  async function handleBet() {
    let amount = amountRef.current?.value;
    let team = teamRef.current?.value;

    if (!amount || !team) return;

    const odd = team == game.TEAM1TEAMNAME ? game.ODD1 : game.ODD2;

    let respBet = await fetch("/api/bet/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        odd: odd,
        value: amount,
        gameId: game.id,
        teamName: team,
      }),
    });
    const jsonBet = await respBet.json();
    console.log(jsonBet);

    if (jsonBet?.isCreated) {
      let respBalance = await fetch("/api/user/balance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: -amount,
        }),
      });
      const jsonBalance = await respBalance.json();
      console.log(jsonBalance);

      router.push("/");
    }
  }

  return (
    <Container
      alignSelf="center"
      w="450px"
      h="320px"
      bgColor="#3B3B3B"
      textAlign="center"
      p="2.5"
      mt="10"
      shadow="1px 1px rgba(0,0,0,0.4)"
      color="white"
      borderRadius="xl"
    >
      <Box fontWeight="bold" fontSize="16pt">
        <Box>
          {game.TEAM1TEAMNAME}: {game.ODD1} vs {game.TEAM2TEAMNAME}: {game.ODD2}
        </Box>
        <Box>{formatDateWithHour(game.GAME_DATE)}</Box>
      </Box>
      <Stack spacing={6} margin={4}>
        <FormControl>
          <FormLabel>Quantidade a apostar</FormLabel>
          <NumberInput placeholder="Quantidade" max={balance} min={0}>
            <NumberInputField ref={amountRef} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel mt={2}>Time da aposta</FormLabel>
          <Select placeholder="Time" ref={teamRef}>
            <option value={game.TEAM1TEAMNAME}>{game.TEAM1TEAMNAME}</option>
            <option value={game.TEAM2TEAMNAME}>{game.TEAM2TEAMNAME}</option>
          </Select>
          <Button
            colorScheme="teal"
            datainput="loginForm"
            mt={4}
            onClick={handleBet}
          >
            Apostar
          </Button>
        </FormControl>
      </Stack>
    </Container>
  );
}

export async function getServerSideProps({ req, query }) {
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

  const respGame = await fetch(process.env.API_URL + "game/" + query.id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const game = await respGame.json();
  const balance = jwt_resp.decoded.balance;

  return { props: { jwt_resp, game, balance } };
}
