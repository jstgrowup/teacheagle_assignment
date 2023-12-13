"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import ManagerNavbar from "@/components/managerNavbar";
import axios from "axios";
const getInventory = async () => {
  try {
    const result = await axios.get("/api/inventory");
    return result?.data?.data;
  } catch (error) {}
};
function ManagerInventory() {
  const [data, setdata] = useState<any>([]);
  useEffect(() => {
    getInventory()
      .then((result: any) => setdata(result))
      .catch((error: any) => console.log(error));
  }, []);
  console.log("data:", data);

  return (
    <>
      <ManagerNavbar />
      {data?.map((item: any) => {
        return (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            display={"flex"}
            key={item._id}
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={item?.productImage}
              alt="Caffe Latte"
            />
            <CardBody>
              <Heading size="md">Product Name</Heading>
              <Heading size={"sm"}>{item.productName}</Heading>
            </CardBody>
            <CardBody>
              <Heading size="md">Stock Availability</Heading>
              <Heading size={"sm"}>
                {item.inStock ? "In Stock" : "Out Of stock"}
              </Heading>
            </CardBody>
            <CardBody>
              <Heading size="md">Stock Quantity</Heading>
              <Heading size={"sm"}>{item.stockQuantity}</Heading>
            </CardBody>
            <CardBody>
              <Heading size="md">Product Description</Heading>
              <Heading size={"sm"}>{item.productDescription}</Heading>
            </CardBody>
            <CardBody>
              <Heading size="md">Product Weight</Heading>
              <Heading size={"sm"}>{item.weight}</Heading>
            </CardBody>
            <CardFooter>
              <Button variant="solid" colorScheme="blue">
                Buy Latte
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}

export default ManagerInventory;
