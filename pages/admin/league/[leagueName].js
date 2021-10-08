import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Container, Stack } from "@chakra-ui/layout";
import "react-datepicker/dist/react-datepicker.css";
import { useRef } from "react";
import router from "next/router";
import { adminAuth } from "src/components/authenticated";

function leagueUpdate({ jwt_resp, league }) {
  const leagueNameRef = useRef(null);
  const countryRef = useRef(null);

  async function commit() {
    let leagueName = leagueNameRef.current?.value;
    let country = countryRef.current?.value;

    if (!leagueName || !country) {
      return;
    }

    let resp = await fetch("/api/league/" + league.LEAGUE_NAME, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leagueName: leagueName,
        region: country,
      }),
    });
    const json = await resp.json();
    console.log(json);

    router.push("/admin/leagueManager");
  }

  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  return (
    <>
      <Container
        alignSelf="center"
        w="450px"
        textAlign="center"
        p="2.5"
        mt="10"
        shadow="1px 1px rgba(0,0,0,0.4)"
        color="white"
        borderRadius="xl"
        bgColor="#3B3B3B"
      >
        <Box fontWeight="bold" fontSize="18px">
          Atualizando {league.LEAGUE_NAME}:
        </Box>
        <Stack spacing={6} margin={4}>
          <form action="/userSignup" id="register">
            <FormControl>
              <FormLabel>Nome da liga:</FormLabel>
              <Input
                placeholder="nome da liga"
                ref={leagueNameRef}
                defaultValue={league.LEAGUE_NAME}
              />
              <FormLabel mt={2}>País da liga:</FormLabel>
              <Input
                placeholder="país da liga"
                ref={countryRef}
                defaultValue={league.REGION}
              />
              <Box marginTop={4}>
                <Button
                  colorScheme="teal"
                  datainput="loginForm"
                  onClick={commit}
                >
                  Atualizar liga
                </Button>
              </Box>
            </FormControl>
          </form>
        </Stack>
      </Container>
      ;
    </>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const { cookies } = req;
  const jwt_resp = await adminAuth(cookies.auth);

  const apiUrl = process.env.API_URL + "league/" + query.leagueName;
  const reqT = await fetch(apiUrl, {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });

  let league = await reqT.json();

  return { props: { jwt_resp, league } };
}

export default leagueUpdate;
