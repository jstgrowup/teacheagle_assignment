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
  Select,
} from "@chakra-ui/react";
import ManagerNavbar from "@/components/managerNavbar";
import axios from "axios";
function ManagerOrders() {
  let [orderData, setOrderdata] = useState<any>([]);

  const getOrders = async () => {
    try {
      const res = await axios.get("/api/order");
      const {
        data: { data },
      } = res;
      console.log('data:', data)
      setOrderdata(data);
    } catch (error: any) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <ManagerNavbar />
      {orderData?.map((item: any) => {
        <div key={item._id}>
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            display={"flex"}
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              // src={item.src}
              alt="Caffe Latte"
            />

            <CardBody>
              <Heading size="md">The perfect latte</Heading>

              <Text py="2">
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>
            </CardBody>

            <CardFooter>
              <Select placeholder="Select option" bg="#3d348b" color={"white"}>
                <option value="option1" style={{ color: "black" }}>
                  Option 1
                </option>
                <option value="option2" style={{ color: "black" }}>
                  Option 2
                </option>
                <option value="option3" style={{ color: "black" }}>
                  Option 3
                </option>
              </Select>
            </CardFooter>
          </Card>
        </div>;
      })}
    </>
  );
}

export default ManagerOrders;
