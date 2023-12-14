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
import generateOrderId from "@/helpers/orderIdgenerator";

function Navbar() {
  const toast = useToast();
  const btnRef = React.useRef<any>();
  const router = useRouter();
  const [bool, setbool] = useState(false);
  let [cartdata, setcartdata] = useState<any>([]);
  const [carttot, setcarttot] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Onopenfun = () => {
    onOpen();
  };
  const getCart = async () => {
    try {
      const res = await axios.get("/api/cart");
      const { data } = res;
      setcartdata(data?.cartItems);
      const FullPrice = data?.cartItems?.reduce((acc: number, el: any) => {
        return acc + Number(el.productId.price) * el.quantity;
      }, 0);

      setcarttot(FullPrice);
    } catch (error: any) {
      console.log("error:", error);
    }
  };
  const updateProd = async (action: string, id: string) => {
    try {
      await axios.put(`/api/cart/${id}?action=${action}`, {});
      setbool(!bool);
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    getCart();
  }, [bool]);
  const placeOrder = async () => {
    try {
      const orderId = generateOrderId();
      const cartdataIds = cartdata.map((item: any) => item._id);
      const result = await axios.post("/api/order", {
        cartIds: cartdataIds,
        cartTotal: carttot,
        orderId,
        transactionStatus:true
      });
      if (result) {
        toast({
          title: "Order has been created.",
          description: "We've created your Order",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast({
        title: error.response.data,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };
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
            size={"lg"}
            variant={"none"}
            fontFamily={"sans-serif"}
            _hover={{ bg: "blue.300" }}
            color={"white"}
            onClick={Onopenfun}
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
                      {cartdata?.map((e: any) => (
                        <Box w={"100%"} key={e._id}>
                          <Box w={"100%"} bg={"#ffffff"} borderRadius={"9.6px"}>
                            <Flex>
                              <Image
                                w={"25%"}
                                src={e.productId.productImage}
                                borderRadius={["lg", "lg", "", ""]}
                              />
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
                                  {e.productId.productName}
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
                                  <Text>Weight :{e.productId.weight}</Text>
                                </Box>

                                <Box>
                                  <Text
                                    fontSize={"17.6px"}
                                    lineHeight={"26.4px"}
                                    textAlign={"left"}
                                    color={"#000000"}
                                  >
                                    ₹{e.productId.price}
                                  </Text>
                                </Box>
                                <Flex
                                  gap={"4"}
                                  align={"center"}
                                  justify={"space-around"}
                                >
                                  <Button
                                    onClick={() =>
                                      updateProd("CART_INCREASE", e._id)
                                    }
                                    color={"#ffffff"}
                                    fontWeight={"bold"}
                                    float={"right"}
                                    bgColor={"#3d348b"}
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
                                      updateProd("CART_DECREASE", e._id)
                                    }
                                    color={"#ffffff"}
                                    fontWeight={"bold"}
                                    bgColor={"#3d348b"}
                                    borderRadius={"2px"}
                                    fontSize={"14px"}
                                    lineHeight={"30px"}
                                    textAlign={"center"}
                                    disabled={e.quantity === 1}
                                  >
                                    -
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      updateProd("CART_DELETE", e._id)
                                    }
                                    variant={"none"}
                                    bgColor={"#3d348b"}
                                    fontFamily={"sans-serif"}
                                    _hover={{ bg: "blue.300" }}
                                    color={"white"}
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

                  <Flex justify={"space-between"}>
                    <Heading size={"md"}>Your Cart Total is</Heading>
                    <Heading size={"md"}> INR {carttot}</Heading>
                  </Flex>
                </DrawerBody>

                <DrawerFooter>
                  <Button
                    variant="outline"
                    mr={3}
                    w={"95%"}
                    border={"2px"}
                    bgColor={"#3d348b"}
                    fontFamily={"sans-serif"}
                    _hover={{ bg: "blue.400" }}
                    color={"white"}
                    onClick={placeOrder}
                  >
                    Place Order
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
