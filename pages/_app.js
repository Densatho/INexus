import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "src/components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Navbar {...pageProps} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
