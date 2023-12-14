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
  useToast,
} from "@chakra-ui/react";
import ManagerNavbar from "@/components/managerNavbar";
import axios from "axios";
function ManagerOrders() {
  const toast = useToast();
  let [orderData, setOrderdata] = useState<any>([]);
  const [orderStatus, setorderStatus] = useState<string>("");
  const getOrders = async () => {
    try {
      const res = await axios.get("/api/order");
      const {
        data: { data },
      } = res;

      setOrderdata(data);
    } catch (error: any) {
    }
  };
  const changeOrderStatus = async (orderId: string, orderStatus: string) => {
    try {
      const result = await axios.put(`/api/order/${orderId}`, { orderStatus });
      toast({
        title: result?.data,

        status: "success",
        duration: 6000,
        isClosable: true,
      });
      setorderStatus(orderStatus);
    } catch (error) {
    }
  };
  useEffect(() => {
    getOrders();
  }, [orderStatus]);

  return (
    <>
      <ManagerNavbar />
      {orderData?.map((item: any) => {
        return (
          <div key={item._id}>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              display={"flex"}
              align={"center"}
            >
              <CardBody>
                <Heading size="md">Order Id</Heading>
                <Heading size={"lg"}>{item.orderId}</Heading>
              </CardBody>

              <CardBody>
                <Heading size="md">Cart Total</Heading>
                <Heading size={"lg"}>
                  <span>&#x20B9;</span>
                  {item.cartTotal}
                </Heading>
              </CardBody>
              <CardBody>
                <Heading size="md">Order Status</Heading>
                <Heading size={"lg"}>{item.orderStatus}</Heading>
              </CardBody>
              <CardBody>
                <Heading size="md">Total Cart Items</Heading>
                <Heading size={"lg"}>{item.cartIds.length}</Heading>
              </CardBody>
              <CardFooter>
                <Select
                  placeholder="Select option"
                  bg="#3d348b"
                  color={"white"}
                  borderEndRadius={"lg"}
                  value={orderStatus}
                  onChange={(e) => changeOrderStatus(item._id, e.target.value)}
                >
                  <option value="Shipped" style={{ color: "black" }}>
                    Shipped
                  </option>
                  <option value="Out for Delivery" style={{ color: "black" }}>
                    Out for Delivery
                  </option>
                  <option value="Delivered" style={{ color: "black" }}>
                    Delivered
                  </option>
                  <option value="Returned" style={{ color: "black" }}>
                    Returned
                  </option>{" "}
                  <option value="Refunded" style={{ color: "black" }}>
                    Refunded
                  </option>
                </Select>
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </>
  );
}

export default ManagerOrders;
