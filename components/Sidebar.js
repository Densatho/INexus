import Icon from "@chakra-ui/icon";
import { Divider, Flex } from "@chakra-ui/layout";
import NavItem from "./NavItem";
export default function Sidebar() {
  return (
    <Flex
      pos="sticky"
      left="0"
      h="95vh"
      marginTop="0"
      boxShadow="0 2px 4px 0 #080808"
      w="200px"
      flexDirection="column"
      justifyContent="space-between"
      background="#616161"
    >
      <Flex flexDirection="column">
        <NavItem type="father" title="Usuários" destino=""></NavItem>
        <NavItem
          type="child"
          title="Gerenciar Usuários"
          destino="/admin/userManager"
        ></NavItem>
        <NavItem type="father" title="Apostas"></NavItem>
        <NavItem
          type="child"
          title="Gerenciar Apostas"
          destino="/admin/betManager"
        ></NavItem>
      </Flex>
    </Flex>
  );
}
