import { Box, Flex, Center } from "@chakra-ui/layout";
import Sidebar from "src/components/Sidebar";
import { verify } from "jsonwebtoken";
import { adminAuth } from "src/components/authenticated";
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

function betManager({ jwt_resp, bets }) {
  if (!jwt_resp.auth) {
    return <>você não é um Adminstrador</>;
  }

  console.log(bets);

  function renderBet(bet) {
    bet = bet[1];
    return (
      <>
        <Tr>
          <Td>{bet.USERNICKNAME}</Td>
          <Td isNumeric>{bet.GAMEId}</Td>
          <Td isNumeric>{bet.ODDS}</Td>
          <Td isNumeric>{bet.BET_VALUE}</Td>
          <Td>{bet.GAIN ? "ganhou" : "perdeu"}</Td>
          <Td>{bet.TEAMTEAMNAME}</Td>
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
    <Flex>
      <Sidebar />
      <Box w="60%" ml="15%">
        <Table variant="striped" colorScheme="whatsapp">
          <TableCaption placement="top" fontWeight="bold" fontSize="22pt">
            Lista de apostas
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Apostador</Th>
              <Th isNumeric>ID do jogo</Th>
              <Th isNumeric>Odds</Th>
              <Th isNumeric>Valor da aposta</Th>
              <Th>Resultado</Th>
              <Th>Time Apostado</Th>
            </Tr>
          </Thead>
          <Tbody>{Object.entries(bets).map(renderBet)}</Tbody>
        </Table>
      </Box>
    </Flex>
  );
}

export async function getServerSideProps({ req, res }) {
  const { cookies } = req;
  const jwt_resp = await adminAuth(cookies.auth);

  const reqU = await fetch(process.env.API_URL + "bets", {
    method: "GET",
    headers: {
      cookie: req.headers.cookie,
    },
  });
  let bets = await reqU.json();

  return { props: { jwt_resp, bets } };
}

export default betManager;
