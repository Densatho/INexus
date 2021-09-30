import Icon from "@chakra-ui/icon";
import { Flex, Link, Text } from "@chakra-ui/layout";
import { Menu, MenuButton } from "@chakra-ui/menu";

export default function NavItem({ type, title, destino }) {
  return (
    <Flex
      flexDir="column"
      w="100%"
      alignItems="flex-start"
      fontStyle={type == "father" ? "bold" : "normal"}
      fontSize={type == "father" ? "18px" : "14px"}
      p={type == "father" ? "4" : "2"}
      ml={type == "father" ? "0" : "6"}
      color="white"
    >
      <Menu placement="right">
        {destino != "" ? (
          <Link href={destino}>
            <MenuButton>
              <Flex>
                <Text>{title}</Text>
              </Flex>
            </MenuButton>
          </Link>
        ) : (
          <Text>{title}</Text>
        )}
      </Menu>
    </Flex>
  );
}
