import { Box, Center } from "@chakra-ui/layout";
import { getServerSideProps } from "src/components/authenticated";
export { getServerSideProps };

export default function Bets() {
  return (
    <Box>
      <Center fontSize="24pt" mt={4}>
        Minhas apostas
      </Center>
    </Box>
  );
}
