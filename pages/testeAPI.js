import { Box, Button } from "@chakra-ui/react";

function TesteApi(props) {
  let testeResp;
  async function testeApi() {
    const url = "/api/users";

    let users = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let users_update = await users.json();
    console.log(users_update);

    Object.entries(users_update).forEach(async (user) => {
      user = user[1];
      if (user.BALANCE === null) {
        user.BALANCE = 0;
      }

      let testeResp = await fetch(`/api/user/${user.NICKNAME}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: user.NICKNAME,
          name: user.NAME,
          balance: user.BALANCE,
          lastName: user.LASTNAME,
          email: user.EMAIL,
          CPF: user.CPF,
          birthday: user.BIRTHDAY,
        }),
      });
      console.log(await testeResp.json());
    });
  }

  return (
    <Box>
      <Button onClick={testeApi}>Faz o fetch</Button>
    </Box>
  );
}

export default TesteApi;
