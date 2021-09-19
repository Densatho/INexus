import styles from "src/styles/Home.module.css";
import { Box, Flex } from "@chakra-ui/react";
import Layout from "src/components/Layout";

function Home(props) {
  const users = props.users;
  return (
    <Layout title="teste" bgColor="#FF000">
      <Box marginTop={16} w="1300px" marginLeft="auto" marginRight="auto">
        <h1 className={styles.title}>
          Bem vindo a <a style={{ color: "#48ae2b" }}>Nexus!</a>
        </h1>
        <p className={styles.description}>
          Um site de apostas dos campeonatos oficiais de League of Legends
        </p>
      </Box>
    </Layout>
  );
}

export default Home;
