import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useState } from "react";

const { Container, Box, Stack } = require("@chakra-ui/layout");

export function getStaticProps({ nickname }) {
  console.log(nickname);
  return { props: {} };
}

export default function UserLogin(props) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const handleSubmit = () => {};

  return (
    <>
      <Container
        alignSelf="center"
        w="450px"
        h="450px"
        bgColor="#757575"
        textAlign="center"
        p="2.5"
        mt="10"
        shadow="1px 1px rgba(0,0,0,0.4)"
        color="white"
      >
        Faça o seu Login:
        <Stack spacing={6} margin={4}>
          <form action="/userLogin" method="post" id="loginForm">
            <FormControl>
              <FormLabel>Nome de usuário</FormLabel>
              <Input
                placeholder="Username"
                name="nickname"
                id="loginNickname"
              />
              <FormLabel marginTop={2}>Senha</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  id="loginPassword"
                  placeholder="Senha"
                  type={show ? "text" : "password"}
                />
                <InputRightElement>
                  <Button
                    bgColor="rgba(0,0,0,0)"
                    onClick={handleClick}
                    h={8}
                    size="sm"
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button
                colorScheme="teal"
                marginTop={4}
                datainput="loginForm"
                type="submit"
              >
                Logar
              </Button>
            </FormControl>
          </form>
        </Stack>
      </Container>
      ;
    </>
  );
}
