import Navbar from "./Navbar";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

export default function Layout(props) {
  const title = props.title;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="Nexus" content="Bet for League of Legends games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDirection="column" pt={14}>
        {props.children}
      </Flex>
    </div>
  );
}
