import styles from "src/styles/Home.module.css";
import { Box, Flex } from "@chakra-ui/react";
import Layout from "src/components/Layout";
import Image from "next/image";
import Navbar from "src/components/Navbar";
import { getServerSideProps } from "src/components/authenticated";
export { getServerSideProps };

function About(props) {
  return (
    <Layout title="About" bgColor="#FF000">
      <Box marginTop={16} w="1300px" marginLeft="auto" marginRight="auto">
        <h1 className={styles.title}>Sobre:</h1>
        <p className={styles.description}>
          O maior site de apostas de campeonatos de League Of Legends.<br></br>
          Em 2021 foi idealizado como trabalho de faculdade, os donos (hoje
          multimilionários)<br></br>
          Agora viajam pelo mundo com o seu time de eSports enquanto o site gera
          milhões em apostas e prêmios.
        </p>
      </Box>
    </Layout>
  );
}

export default About;
