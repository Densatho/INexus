import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useState } from "react";
import { Box, Container, Stack } from "@chakra-ui/layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bcrypt from "bcryptjs";
import { useRef } from "react";
import router from "next/router";

function UserSignUp(props) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [date, setDate] = useState(new Date(Date.now()));

  const nicknameRef = useRef(null);
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const LastnameRef = useRef(null);
  const cpfRef = useRef(null);
  const dateRef = useRef(null);
  const passRef = useRef(null);
  const passConfRef = useRef(null);

  async function handleSignUp() {
    let nickname = nicknameRef.current?.value;
    let email = emailRef.current?.value;
    let name = nameRef.current?.value;
    let lastname = LastnameRef.current?.value;
    let cpf = cpfRef.current?.value;
    let pass = passRef.current?.value;
    let passConf = passConfRef.current?.value;

    if (
      !nickname ||
      !email ||
      !name ||
      !lastname ||
      !cpf ||
      !pass ||
      pass !== passConf
    ) {
      return;
    }

    let hashed_pass = bcrypt.hashSync(pass, 12);
    let resp = await fetch("/api/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
        email: email,
        name: name,
        lastName: lastname,
        cpf: cpf,
        password: hashed_pass,
      }),
    });
    const json = await resp.json();
    console.log(json);

    router.push("/userLogin");
  }

  return (
    <>
      <Container
        alignSelf="center"
        w="450px"
        bgColor="#757575"
        textAlign="center"
        p="2.5"
        mt="10"
        shadow="1px 1px rgba(0,0,0,0.4)"
        color="white"
      >
        Faça o seu Registro:
        <Stack spacing={6} margin={4}>
          <form action="/userSignup" id="register">
            <FormControl>
              <FormLabel>Nome de usuário:</FormLabel>
              <Input
                placeholder="Username"
                name="nickname"
                id="signupNickname"
                ref={nicknameRef}
              />
              <FormLabel marginTop={2}>Email:</FormLabel>
              <Input
                placeholder="Email"
                name="email"
                id="signupEmail"
                ref={emailRef}
              />
              <FormLabel marginTop={2}>Nome:</FormLabel>
              <Input
                placeholder="Nome"
                name="name"
                id="signupNome"
                ref={nameRef}
              />
              <FormLabel marginTop={2}>Sobrenome:</FormLabel>
              <Input
                placeholder="Sobrenome"
                name="lastName"
                id="signupLastName"
                ref={LastnameRef}
              />
              <FormLabel marginTop={2}>CPF:</FormLabel>
              <Input placeholder="CPF" name="CPF" id="signupCPF" ref={cpfRef} />
              <FormLabel marginTop={2}>Data de nascimento:</FormLabel>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="dd/MM/yyyy"
                name="date"
                customInput={<Input ref={dateRef} />}
              />
              <FormLabel marginTop={2}>Senha</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  id="signupPassword"
                  placeholder="Senha"
                  type={show ? "text" : "password"}
                  ref={passRef}
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
              <FormLabel marginTop={2}>Confirme sua senha</FormLabel>
              <InputGroup>
                <Input
                  name="passwordConfirm"
                  id="signupPasswordConfirm"
                  placeholder="confirme sua senha"
                  type={show ? "text" : "password"}
                  ref={passConfRef}
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
              <Box marginTop={4}>
                <Button
                  colorScheme="teal"
                  datainput="loginForm"
                  onClick={handleSignUp}
                >
                  Criar Conta
                </Button>
              </Box>
            </FormControl>
          </form>
        </Stack>
      </Container>
      ;
    </>
  );
}

export default UserSignUp;
