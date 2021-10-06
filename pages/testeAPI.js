import { Box, Button } from "@chakra-ui/react";
import { getServerSideProps } from "src/components/authenticated";
export { getServerSideProps };

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
        nickname: "Densatho",
        odd: 1.6,
        value: 1000,
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
