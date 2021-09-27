import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { Spacer, Divider } from "@chakra-ui/layout";
import React from "react";

let saldo = 1995.97;
export default function Navbar() {
  return (
    <>
      <Flex p="2" bg="#3B3B3B" w="100%" p={4} h="14" color="white">
        <Flex>
          <Link href="/">
            <a>
              <Image src="/logo.png" alt="Logo" width="90px" height="16px" />
            </a>
          </Link>
        </Flex>
        <Divider orientation="vertical" ml="2" mr="2" />
        <Flex>
          <Link href="/calendar">
            <a>Calendário</a>
          </Link>
        </Flex>
        <Divider orientation="vertical" ml="2" mr="2" />
        <Flex>
          <Link href="/bets">
            <a>Minhas Apostas</a>
          </Link>
        </Flex>
        <Spacer />
        <Flex>
          <Link href="/balance">
            <a>${saldo}</a>
          </Link>
        </Flex>
        <Divider orientation="vertical" ml="2" mr="2" />
        <Flex>
          <Link href="/userLogin">
            <a>Login</a>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}
