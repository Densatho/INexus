import { getServerSideProps } from "src/components/authenticated";
export { getServerSideProps };
import { Box, Container, Stack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/number-input";
import { Button } from "@chakra-ui/button";
import { useRef } from "react";
import router from "next/router";

export default function Balance() {
  const amountRef = useRef(null);

  async function handleAddBalance() {
    let amount = amountRef.current?.value;
    console.log(amount);

    if (!amount) return;

    let resp = await fetch("/api/user/balance", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
      }),
    });
    const json = await resp.json();
    console.log(json);
    router.push("/");
  }

  return (
    <Container
      alignSelf="center"
      w="450px"
      h="250px"
      bgColor="#3B3B3B"
      textAlign="center"
      p="2.5"
      mt="10"
      shadow="1px 1px rgba(0,0,0,0.4)"
      color="white"
      borderRadius="xl"
    >
      <Box fontWeight="bold" fontSize="16pt">
        Carteira
      </Box>
      <Stack spacing={6} margin={4}>
        <FormControl>
          <FormLabel>Colocar quantos reais na carteira</FormLabel>
          <NumberInput placeholder="Quantidade" min={0}>
            <NumberInputField ref={amountRef} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button colorScheme="teal" mt={4} onClick={handleAddBalance}>
            Colocar dinheiro
          </Button>
        </FormControl>
      </Stack>
    </Container>
  );
}
