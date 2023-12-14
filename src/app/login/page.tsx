"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Signin() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setloading] = useState(false);
  const toast = useToast();

  const router = useRouter();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const postUser = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      alert("All fields are required");
    }
    try {
      setloading(true);
      const res = await axios.post("/api/login", formData);
      setloading(false);
      if (res.data.isManager) {
        router.push("/manager/orders");
      } else {
        router.push("/products");
      }
    } catch (e: any) {
      alert(e.response.data.error);

      setloading(false);
    }
  };

  const handleSubmit = () => {
    postUser();
  };
  return (
    <Box>
      <Center p={"10"}>
        <Box
          w={["300", "420px", "490px", "520px"]}
          bg={useColorModeValue("white", "white")}
          color={useColorModeValue("black", "black")}
          borderRadius={"2xl"}
          boxShadow={"2xl"}
        >
          <Flex
            direction={"column"}
            align="start"
            p={["8", "5", "6", "8"]}
            gap={"3"}
          >
            <Heading>Log In</Heading>

            <Text fontSize={"sm"} align={"start"}>
              Email Id{" "}
            </Text>
            <Input
              borderColor={"black"}
              type={"text"}
              name={"email"}
              onChange={handleChange}
              placeholder="Enter your Email Id"
            ></Input>
            <Text fontSize={"sm"}>Password</Text>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                borderColor={"black"}
                type={show ? "text" : "password"}
                name={"password"}
                onChange={handleChange}
                placeholder="Enter Your Password"
              />
              <InputRightElement onClick={handleClick} cursor={"pointer"}>
                {show ? <ViewIcon boxSize={5} /> : <ViewOffIcon boxSize={5} />}
              </InputRightElement>
            </InputGroup>
            <Link href={"/signup"}>
              <Text>
                Dont Have an account?{" "}
                <span style={{ color: "red" }}>Create an Account</span>{" "}
              </Text>
            </Link>

            <Button
              isLoading={loading}
              loadingText={"Submitting"}
              onClick={handleSubmit}
              color={"white"}
              size={"lg"}
              width={"100%"}
              bg={"#3d348b"}
              _hover={{ backgroundColor: "#C11C2D" }}
            >
              Log In
            </Button>
          </Flex>
        </Box>
      </Center>
    </Box>
  );
}

export default Signin;
