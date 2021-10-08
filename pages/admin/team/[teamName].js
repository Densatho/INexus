import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Container, Stack, Flex } from "@chakra-ui/layout";
import "react-datepicker/dist/react-datepicker.css";
import { useRef } from "react";
import router from "next/router";
import { adminAuth } from "src/components/authenticated";
import Sidebar from "src/components/Sidebar";

function teamUpdate({ jwt_resp, team }) {
  const teamNameRef = useRef(null);

  async function commit() {
    let teamName = teamNameRef.current?.value;

    if (!teamName) {
      return;
    }

    let resp = await fetch("/api/team/" + team.TEAM_NAME, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamName: teamName,
      }),
    });
    const json = await resp.json();
    console.log(json);

    router.push("/admin/teamManager");
  }

  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  return (
    <Flex>
      <Sidebar />
      <Container
        h="200px"
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
          Atualizando {team.TEAM_NAME}:
        </Box>
        <Stack spacing={6} margin={4}>
          <form action="/userSignup" id="register">
            <FormControl>
              <FormLabel>Nome do time:</FormLabel>
              <Input
                placeholder="nome do time"
                name="teamName"
                id="signupTeamName"
                ref={teamNameRef}
                defaultValue={team.TEAM_NAME}
              />
              <Box marginTop={4}>
                <Button
                  colorScheme="teal"
                  datainput="loginForm"
                  onClick={commit}
                >
                  Atualizar time
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

export async function getServerSideProps({ req, res, query }) {
  const { cookies } = req;
  const jwt_resp = await adminAuth(cookies.auth);

  const apiUrl = process.env.API_URL + "team/" + query.teamName;
  const reqT = await fetch(apiUrl, {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });

  let team = await reqT.json();

  return { props: { jwt_resp, team } };
}

export default teamUpdate;
