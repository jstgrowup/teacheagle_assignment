"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
import { HamburgerIcon } from "@chakra-ui/icons";

import { BsSun, BsMoonStarsFill } from "react-icons/bs";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function ManagerNavbar() {
  const router = useRouter();

  return (
    <div>
      <Flex
        justify={"space-between"}
        w={"100%"}
        h={["80px", "80px", "80px", "80px"]}
        bg={"#3d348b"}
      >
        <Box w={"50%"}></Box>
        <HStack
          display={{ base: "none", md: "flex" }}
          bg={"#3d348b"}
          w={"50%%"}
          h={"80px"}
          align={"center"}
        >
          <Button
            size={"lg"}
            variant={"none"}
            fontFamily={"sans-serif"}
            color={"white"}
            _hover={{ bg: "blue.300" }}
            onClick={() => router.push("/manager/inventory")}
          >
            Inventory
          </Button>
          <Button
            size={"lg"}
            variant={"none"}
            fontFamily={"sans-serif"}
            _hover={{ bg: "blue.300" }}
            color={"white"}
            onClick={() => router.push("/manager/orders")}
          >
            orders
          </Button>
        </HStack>
      </Flex>
    </div>
  );
}
export default ManagerNavbar;
