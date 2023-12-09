"use client";

import React, { useState } from "react";
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
import axios from "axios";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
function Signup() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "Customer",
    isManager: false,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const postUser = async () => {
    console.log("formData:", formData);
    const { email, password } = formData;
    if (!email || !password) {
      alert("All fields are required");
    }
    try {
      setloading(true);
      const res = await axios.post("/api/signup", formData);
      console.log("res:", res);
      setloading(false);
      router.push("/login");
    } catch (e: any) {
      console.log("e:", e);
      alert(e.response.data.error);

      setloading(false);
    }
  };

  const handleSubmit = () => {
    postUser();
  };
  return (
    <Center p={["3", "3", "6", "10"]}>
      <Box
        w={["400", "430px", "490px", "520px"]}
        bg={useColorModeValue("white", "white")}
        color={useColorModeValue("black", "black")}
        borderRadius={"2xl"}
        boxShadow={"2xl"}
      >
        <Flex
          direction={"column"}
          align="start"
          p={["6", "5", "6", "8"]}
          gap={"3"}
        >
          <Heading>Create Account</Heading>

          <Text fontSize={"sm"} align={"start"}>
            Full Name{" "}
          </Text>
          <Input
            borderColor={"black"}
            type={"text"}
            name={"name"}
            onChange={handleChange}
            placeholder="Enter your Full Name"
          ></Input>
          <Text fontSize={"sm"} align={"start"}>
            EMAIL ID{" "}
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

          <Button
            isLoading={loading}
            loadingText={"Submitting"}
            onClick={handleSubmit}
            color={"white"}
            size={"lg"}
            width={"100%"}
            _hover={{ bg: "#24AEB1" }}
            bg={"#24AEB1"}
          >
            Signup
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}

export default Signup;
