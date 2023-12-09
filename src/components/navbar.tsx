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

function Navbar() {
  const btnRef = React.useRef<any>();
  const router=useRouter()
  let [cartdata, setcartdata] = useState<any>([]);
  const [carttot, setcarttot] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Onopenfun = () => {
    onOpen();
  };
  const getCart = async () => {
    try {
      const res = await axios.get(
        ``
      );
      const { data } = res;
      setcartdata(data);
      const FullPrice = cartdata.reduce((acc: number, el: any) => {
        const {
          product: { price },
          quantity,
        } = el;
      return acc + Number(price) * quantity;
      }, 0);

      setcarttot(FullPrice);
    } catch (error:any) {
    console.log('error:', error)
    }
  };
  useEffect(() => {
    getCart();
    const FullPrice = cartdata.reduce((acc: number, el: any) => {
      const {
        product: { price },
        quantity,
      } = el;

      return acc + Number(price) * quantity;
    }, 0);
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
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            size={"lg"}
            variant={"none"}
            fontFamily={"sans-serif"}
            _hover={{ bg: "blue.300" }}
            color={"white"}
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
          <Button
            ref={btnRef}
            colorScheme="#c02332"
            onClick={Onopenfun}
            backgroundColor={"#c02332"}
          >
            Cart
          </Button>
          <Drawer
            size={"sm"}
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <Container maxW={"419px"}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                  <Text
                    fontSize={"16px"}
                    lineHeight={"24px"}
                    textAlign={"left"}
                    textColor={"dark"}
                    ml={4}
                    fontWeight={"bold"}
                    color={"#343a40"}
                  >
                    Order Summary
                  </Text>
                </DrawerHeader>

                <DrawerBody>
                  <Box bg={"#fff5f5"}>
                    <Flex
                      w={"100%"}
                      direction={"column"}
                      gap={"20px"}
                      alignItems="center"
                      justifyContent="space-between"
                      borderWidth={0}
                      overflowX="auto"
                    >
                      {cartdata.map((e) => (
                        <Box w={"100%"} key={e.product._id}>
                          <Box
                            // h={"83px"}
                            w={"100%"}
                            bg={"#ffffff"}
                            boxShadow={"rgb(170, 170, 170) 0px 1px 5px 0.25px"}
                            borderRadius={"9.6px"}
                          >
                            <Flex>
                              <Image w={"25%"} src={e.product.image} />

                              <Flex
                                paddingLeft={"5px"}
                                w={"75%"}
                                direction={"column"}
                              >
                                <Text
                                  color={"#000000"}
                                  fontSize={"16px"}
                                  lineHeight={"19.2px"}
                                  textAlign={"left"}
                                >
                                  {e.product.title}
                                </Text>
                                <Box
                                  display={"flex"}
                                  alignItems={"center"}
                                  fontSize={"12px"}
                                  lineHeight={"18px"}
                                  bg={"#e9e3e3"}
                                  p={["6px", "10px"]}
                                  color={"#414b4e"}
                                  mr={"8px"}
                                  h={"32px"}
                                  w={"141px"}
                                >
                                  <Text>Weight :{e.product.weight}</Text>
                                </Box>

                                <Box>
                                  <Text
                                    fontSize={"17.6px"}
                                    lineHeight={"26.4px"}
                                    textAlign={"left"}
                                    color={"#000000"}
                                  >
                                    ₹{e.product.price}
                                  </Text>
                                </Box>
                                <Flex
                                  gap={"4"}
                                  align={"center"}
                                  justify={"space-around"}
                                >
                                  <Button
                                    onClick={() =>
                                      updateProd("asc", e.product._id)
                                    }
                                    color={"#ffffff"}
                                    fontWeight={"bold"}
                                    float={"right"}
                                    boxShadow={
                                      "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px"
                                    }
                                    bg={"#b71c1c"}
                                    borderRadius={"2px"}
                                    fontSize={"14px"}
                                    lineHeight={"30px"}
                                    textAlign={"center"}
                                  >
                                    +
                                  </Button>
                                  <Heading size={"md"}>{e.quantity}</Heading>
                                  <Button
                                    onClick={() =>
                                      updateProd("desc", e.product._id)
                                    }
                                    color={"#ffffff"}
                                    fontWeight={"bold"}
                                    float={"right"}
                                    boxShadow={
                                      "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px"
                                    }
                                    bg={"#b71c1c"}
                                    borderRadius={"2px"}
                                    fontSize={"14px"}
                                    lineHeight={"30px"}
                                    textAlign={"center"}
                                    disabled={e.quantity === 1}
                                  >
                                    -
                                  </Button>
                                  <Button
                                    onClick={() => deleteItem(e.product._id)}
                                    color={"#ffffff"}
                                    boxShadow={
                                      "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px"
                                    }
                                    bg={"#b71c1c"}
                                  >
                                    Remove
                                  </Button>
                                </Flex>
                              </Flex>
                            </Flex>
                          </Box>
                        </Box>
                      ))}
                    </Flex>
                  </Box>

                  <Box
                    mt={"10px"}
                    p={"5px"}
                    h={"51px"}
                    // w={"419px"}
                    bg={"#2d9236"}
                    color={"#f7f6f6"}
                    fontSize={"14.4px"}
                    lineHeight={"19.2px"}
                    textAlign={"center"}
                  >
                    TenderCuts Elite Plan has been added to your cart, now enjoy
                    Free delivery + product discounts.
                  </Box>

                  <Flex justify={"space-between"}>
                    <Heading size={"md"}>Your Cart Total is</Heading>
                    <Heading size={"md"}> INR {carttot}</Heading>
                  </Flex>

                  <Box>
                    <AllcartItems />
                  </Box>
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue">
                    <PayButton />
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Container>
          </Drawer>
        </HStack>
      </Flex>
    </div>
  );
}

export default Navbar;
