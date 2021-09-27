import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
const db_init = require("src/database/DB_init");

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
