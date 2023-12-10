import React from "react";
import { Box, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import CartButton from "./cartButton";
// https://assets.tendercuts.in/product/P/R/63c42955-a41b-45ce-98e1-cb7510eeac4f.jpg
function ProductCard({ productImage, productName, weight, price, _id }: any) {
  return (
    <Box
      _hover={{ transform: "scale(1.01)" }}
      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      borderRadius={["lg", "lg", "", ""]}
      minW={"377px"}
      minH={"354px"}
    >
      <Image
        borderRadius={["lg", "lg", "", ""]}
        src={
          "https://assets.tendercuts.in/product/P/R/63c42955-a41b-45ce-98e1-cb7510eeac4f.jpg"
        }
      ></Image>
      <Box p={"4"}>
        <Text fontWeight={"bold"}>{productName}</Text>

        <Flex
          bg={"rgb(242,242,242)"}
          minH={"36px"}
          maxW={"60%"}
          align={"center"}
          justify="space-evenly"
        >
          <Image w={"8"} src={productImage}></Image>
          <Text color={"black"}>Weight: {weight} Gms</Text>
        </Flex>
        <Flex
          align={"center"}
          direction={["column", "row"]}
          justify="space-between"
        >
          <Flex gap={"10"}>
            <Text>
              {" "}
              MRP <span> &#x20b9; {price}</span>{" "}
            </Text>
          </Flex>

          <CartButton />
        </Flex>
      </Box>
    </Box>
  );
}

export default ProductCard;
