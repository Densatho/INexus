import Icon from "@chakra-ui/icon";
import { Divider, Flex } from "@chakra-ui/layout";
import NavItem from "./NavItem";

export default function Sidebar() {
  const tags = ["Usuários", "Apostas", "Times", "Ligas"];
  const childs = [
    { tag: "Usuários", value: "Gerenciar Usuários", ref: "/admin/userManager" },
    { tag: "Apostas", value: "Gerenciar Apostas", ref: "/admin/betManager" },
    { tag: "Times", value: "Gerenciar Times", ref: "/admin/teamManager" },
    { tag: "Ligas", value: "Gerenciar Ligas", ref: "/admin/leagueManager" },
  ];
  let currentTag = "";

  function renderChild(child) {
    if (child.tag === currentTag) {
      return (
        <>
          <NavItem type="child" title={child.value} destino={child.ref} />
        </>
      );
    }
  }

  function renderTag(tag) {
    currentTag = tag;
    return (
      <>
        <NavItem type="father" title={tag} destino="" />
        {childs.map(renderChild)}
      </>
    );
  }

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
        <NavItem type="father" title="Dashboard" destino="/admin" />
        {tags.map(renderTag)}
      </Flex>
    </Flex>
  );
}
