import {
  Flex,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { Spacer, Divider } from "@chakra-ui/layout";
import React from "react";
import cookie from "cookie";

let saldo = 1995.97;
function Navbar(props) {
  function isUser() {
    if (process.browser) {
      let username = document.cookie?.split("=")[1];
      return username ? (
        <>
          <Flex>
            <Link href="/balance">
              <a>${saldo}</a>
            </Link>
          </Flex>
          <Divider orientation="vertical" ml="2" mr="2" />
          <Flex bg="charcoal.50">
            <Menu>
              <MenuButton
                as={Avatar}
                mr={6}
                name={username}
                src="/images/avatar.png"
                size="sm"
              />
              <MenuList _focus={{ bg: "charcoal.400" }}>
                <MenuItem>{username}</MenuItem>
                <MenuItem>Perfil</MenuItem>
                <MenuItem>Perfil</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </>
      ) : (
        <Flex>
          <Link href="/userLogin">
            <a>Login</a>
          </Link>
        </Flex>
      );
    }
  }

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
        {isUser()}
      </Flex>
    </>
  );
}

export default Navbar;
