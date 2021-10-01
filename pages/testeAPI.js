import { Box, Button } from "@chakra-ui/react";

function TesteApi(props) {
  let testeResp;
  async function testeApi() {
    const url = "/api/bet/add";

    // req.body.odd,
    // req.body.value,
    // req.body.nickname,
    // req.body.gameId,
    // req.body.teamName

    let testeResp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        odd: 1.5,
        value: 4000,
        nickname: "Densatho",
        gameId: 1,
        teamName: "pain gaming",
      }),
    });
    console.log(await testeResp.json());
  }

  return (
    <Box>
      <Button onClick={testeApi}>Faz o fetch</Button>
    </Box>
  );
}

export default TesteApi;
