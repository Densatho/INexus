import { Button } from "@chakra-ui/button";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useState } from "react";
import { Box, Container, Flex, Spacer, Stack } from "@chakra-ui/layout";
import Link from "next/link";
import { useRef } from "react";
import router from "next/router";

function UserLogin(props) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const nicknameRef = useRef(null);
  const passRef = useRef(null);

  async function handleLogin() {
    let resp = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nicknameRef.current?.value,
        password: passRef.current?.value,
      }),
    });
    const json = await resp.json();
    console.log(json);
    if (json.message === "Welcome back to the app!") {
      document.cookie = `nickname=${nicknameRef.current?.value}; expires=Session; secure=true; sameSite=Strict; path=/`;
      document.cookie = `balance=${json.balance}; expires=Session; secure=true; sameSite=Strict; path=/`;
      router.push("/");
    }
    if (json.isAdmin) {
      document.cookie = `isAdmin=true; expires=Session; secure=true; sameSite=Strict; path=/`;
      router.push("/");
    }
  }

  if (process.browser) {
    let cookies = document.cookie?.split(/[\s,=;]+/);
    if (cookies.includes("nickname")) {
      return <>Você já esta autenticado</>;
    }
  }

  return (
    <>
      <Container
        alignSelf="center"
        w="350px"
        h="350px"
        bgColor="#3B3B3B"
        textAlign="center"
        p="2.5"
        mt="10"
        shadow="1px 1px rgba(0,0,0,0.4)"
        color="white"
        borderRadius="xl"
      >
        <Box fontWeight="bold" fontSize="18px">
          Login
        </Box>
        <Stack spacing={6} margin={4}>
          <form action="/login" id="loginForm">
            <FormControl>
              <FormLabel>Nome de usuário</FormLabel>
              <Input
                placeholder="Usuário"
                name="nickname"
                id="loginNickname"
                ref={nicknameRef}
              />
              <FormLabel marginTop={2}>Senha</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  id="loginPassword"
                  placeholder="Senha"
                  type={show ? "text" : "password"}
                  ref={passRef}
                />
                <InputRightElement>
                  <Button
                    colorScheme="teal"
                    bgColor="rgba(0,0,0,0)"
                    onClick={handleClick}
                    h={6}
                    bw={6}
                    size="md"
                    mr="4vh"
                  >
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Flex marginTop={4}>
                <Box marginTop={1}>
                  <Link href="/signup">
                    <a>Criar conta</a>
                  </Link>
                </Box>
                <Spacer />
                <Box marginRight="0">
                  <Button
                    colorScheme="teal"
                    datainput="loginForm"
                    onClick={handleLogin}
                  >
                    Logar
                  </Button>
                </Box>
              </Flex>
            </FormControl>
          </form>
        </Stack>
      </Container>
      ;
    </>
  );
}

export default UserLogin;
