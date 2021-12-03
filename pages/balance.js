import { Box, Center } from "@chakra-ui/layout";
import { getServerSideProps } from "src/components/authenticated";
export { getServerSideProps };

export default function Balance() {
  return (
    <Box>
      <Center fontSize="24pt" mt={4}>
        Carteira
      </Center>
    </Box>
  );
}
