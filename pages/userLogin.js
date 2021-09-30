const { Container } = require("@chakra-ui/layout");

export default function UserLogin() {
  return (
    <>
      <Container
        alignSelf="center"
        w="450px"
        h="450px"
        color="blue"
        border="2px"
        textAlign="center"
        p="2.5"
        mt="10"
      >
        Tela de login
      </Container>
      ;
    </>
  );
}
