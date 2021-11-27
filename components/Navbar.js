import {
  Flex,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuGroup,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { Spacer, Divider } from "@chakra-ui/layout";
import React from "react";
import router from "next/router";

function Navbar({ jwt_resp }) {
  let saldo = "";
  if (jwt_resp.auth) {
    saldo = jwt_resp.decoded.balance;
  }

  const logout = async () => {
    await fetch("/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        confirm: true,
      }),
    });

    router.push("/");
  };

  function isUser() {
    return jwt_resp?.auth ? (
      <>
        <Flex>
          <Link href="/balance">
            <a>R${saldo}</a>
          </Link>
        </Flex>
        <Divider orientation="vertical" ml="2" mr="2" />
        <Menu>
          <MenuButton
            as={Avatar}
            mr={6}
            name={jwt_resp.decoded.sub}
            src="/images/avatar.png"
            size="sm"
          />
          <MenuList bg="#616161">
            <MenuGroup title={jwt_resp.decoded.sub}>
              <Link href="/bets">
                <MenuItem _focus={{ bg: "#878787" }}>Minhas Apostas</MenuItem>
              </Link>
              {jwt_resp.decoded.isAdmin ? (
                <Link href="/admin/">
                  <MenuItem _focus={{ bg: "#878787" }}>Dashboard</MenuItem>
                </Link>
              ) : (
                <></>
              )}
            </MenuGroup>
            <MenuItem onClick={logout} _focus={{ bg: "#878787" }}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    ) : (
      <Flex>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Flex>
    );
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
        <Spacer />
        {isUser()}
      </Flex>
    </>
  );
}

export default Navbar;
