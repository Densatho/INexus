import { Box, Center } from "@chakra-ui/layout";
import { verify } from "jsonwebtoken";

export default function gameId({ game }) {
  console.log(game);

  return (
    <Box>
      <Center fontSize="24pt" mt={4}>
        Jogo da
      </Center>
    </Box>
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

  return { props: { jwt_resp, game } };
}
