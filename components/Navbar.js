import {
  Flex,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { Spacer, Divider } from "@chakra-ui/layout";
import React from "react";
import router from "next/router";

let saldo = 1995.97;

function Navbar(props) {
  const logout = async () => {
    let cookies = document.cookie?.split(/[\s,=;]+/);
    console.log(cookies);
    if (cookies.includes("nickname")) {
      document.cookie = "nickname=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    if (cookies.includes("isAdmin")) {
      document.cookie = "isAdmin=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

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
    if (process.browser) {
      console.log(document.cookie);
      let cookies = document.cookie?.split(/[\s,=;]+/);
      console.log(cookies);
      let username;
      let admin;
      if (cookies.includes("nickname")) {
        let index = cookies.indexOf("nickname") + 1;
        username = cookies[index];
      }
      if (cookies.includes("isAdmin")) {
        let index = cookies.indexOf("isAdmin") + 1;
        admin = cookies[index];
      }

      return username ? (
        <>
          <Flex>
            <Link href="/balance">
              <a>${saldo}</a>
            </Link>
          </Flex>
          <Divider orientation="vertical" ml="2" mr="2" />
          <Menu>
            <MenuButton
              as={Avatar}
              mr={6}
              name={username}
              src="/images/avatar.png"
              size="sm"
            />
            <MenuList bg="#616161">
              <MenuGroup title={username}>
                <Link href="/bets">
                  <MenuItem _focus={{ bg: "#878787" }}>Minhas Apostas</MenuItem>
                </Link>
                {admin ? (
                  <a href="/admin/dashboard">
                    <MenuItem _focus={{ bg: "#878787" }}>Dashboard</MenuItem>
                  </a>
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
