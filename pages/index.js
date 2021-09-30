import styles from "src/styles/Home.module.css";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

function Home(props) {
  return (
    <Box marginTop={16} w="1300px" marginLeft="auto" marginRight="auto">
      <h1 className={styles.title}>
        <span>
          Bem vindo à{" "}
          <Image src="/logo.png" alt="Logo" width="150px" height="30px" />
        </span>
      </h1>
      <p className={styles.description}>
        Ainda estamos em construção😕. <br></br>
        Mas não se preocupe!<br></br>
        Volte em alguns dias para acessar o maior site de apostas de League Of
        Legends!
      </p>
    </Box>
  );
}

export default Home;
