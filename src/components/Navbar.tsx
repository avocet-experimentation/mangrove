/* for now, links to EventTable and FlagTable only
 */

import { Flex, chakra, Icon } from "@chakra-ui/react";
import {
  Flag,
  Microscope,
  TestTubes,
  AlignHorizontalDistributeCenter,
} from "lucide-react";
import { Link } from "wouter";

const NavBox = chakra("div", {
  base: {
    width: "90%",
    borderRadius: "5px",
    color: "black",
    height: "50px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "1.15em",
    padding: "0 20px",
    _hover: {
      bg: "gray.200",
    },
  },
});

const NavText = chakra("p", {
  base: {
    color: "black",
    textDecoration: "none",
    padding: "15px",
    width: "15cqi",
  },
});

export default function Navbar() {
  return (
    <Flex
      direction="column"
      width="20%"
      height="100%"
      paddingTop="25px"
      bg="white"
      alignItems="center"
    >
      <NavBox>
        <Icon>
          <Flag />
        </Icon>
        <Link href="/features" draggable={false}>
          <NavText>Features</NavText>
        </Link>
      </NavBox>
      <NavBox>
        <Icon>
          <TestTubes />
        </Icon>
        <Link href="/experiments" draggable={false}>
          <NavText>Experiments</NavText>
        </Link>
      </NavBox>
      <NavBox>
        <Icon>
          <AlignHorizontalDistributeCenter />
        </Icon>
        <Link href="/events" draggable={false}>
          <NavText>Event Data</NavText>
        </Link>
      </NavBox>
      <NavBox>
        <Icon>
          <Microscope />
        </Icon>
        <Link href="/insights" draggable={false}>
          <NavText>Insights</NavText>
        </Link>
      </NavBox>
    </Flex>
  );
}
