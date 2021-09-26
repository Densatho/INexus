import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { Spacer, Divider } from "@chakra-ui/layout";
import React from "react";

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
        <Spacer />
        <Flex>
          <Link href="/about">Sobre</Link>
        </Flex>
      </Flex>
    </>
  );
}
