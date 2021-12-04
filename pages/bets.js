import { Box, Center } from "@chakra-ui/layout";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { verify } from "jsonwebtoken";

export default function Bets({ bets }) {
  function renderBet(bet) {
    bet = bet[1];
    return (
      <>
        <Tr>
          <Td isNumeric>{bet.GAMEId}</Td>
          <Td isNumeric>{bet.ODDS}</Td>
          <Td isNumeric>{bet.BET_VALUE}</Td>
          <Td>{bet.GAIN ? "ganhou" : "perdeu"}</Td>
          <Td>{bet.TEAMTEAMNAME}</Td>
          <Td isNumeric>{bet.GAIN ? bet.BET_VALUE * bet.ODDS : 0}</Td>
        </Tr>
      </>
    );
  }

  if (!bets[0]) {
    return (
      <Flex>
        <Sidebar />
        <p>Não tem apostas</p>
      </Flex>
    );
  }

  return (
    <Box>
      <Center mt={4}>
        <Box w="70%">
          <Table variant="striped" colorScheme="whatsapp">
            <TableCaption placement="top" fontWeight="bold" fontSize="22pt">
              Lista de apostas
            </TableCaption>
            <Thead>
              <Tr>
                <Th isNumeric>Jogo</Th>
                <Th isNumeric>Odds</Th>
                <Th isNumeric>Valor da aposta</Th>
                <Th>Resultado</Th>
                <Th>Time Apostado</Th>
                <Th isNumeric>Valor ganho</Th>
              </Tr>
            </Thead>
            <Tbody>{Object.entries(bets).map(renderBet)}</Tbody>
          </Table>
        </Box>
      </Center>
    </Box>
  );
}

export async function getServerSideProps({ req, res }) {
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

  const reqU = await fetch(process.env.API_URL + "user/bets", {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });
  let bets = await reqU.json();

  return { props: { jwt_resp, bets } };
}
