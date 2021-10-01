import { Box, Button } from "@chakra-ui/react";

function TesteApi(props) {
  let testeResp;
  async function testeApi() {
    const url = "/api/user/delete";

    // req.body.odd,
    // req.body.value,
    // req.body.nickname,
    // req.body.gameId,
    // req.body.teamName

    // let testeResp = await fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     nickname: "Densatho",
    //   }),
    // });
    // console.log(await testeResp.json());
  }

  return (
    <Box>
      <Button onClick={testeApi}>Faz o fetch</Button>
    </Box>
  );
}

export default TesteApi;
