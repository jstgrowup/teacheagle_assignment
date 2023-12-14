"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [data, setdata] = useState<any>([]);
  const [bool, setbool] = useState(false);
  const [formData, setformData] = useState({
    productName: "",
    productDescription: "",
    stockQuantity: 0,
    weight: "",
    price: 0,
  });
  const createProduct = async (product: any) => {
    try {
      const result = await axios.post("/api/inventory", product);
    } catch (error) {}
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  useEffect(() => {
    getInventory()
      .then((result: any) => setdata(result))
      .catch((error: any) => console.log(error));
  }, [bool]);

  const deleteProduct = async (productId: string) => {
    try {
      const result = await axios.delete(`/api/inventory/${productId}`);
      if (result) {
        setbool(!bool);
      }
    } catch (error) {}
  };

  return (
    <>
      <ManagerNavbar />
      <Flex justify={"center"}>
        <Button variant="solid" colorScheme="blue" onClick={onOpen}>
          Add Product
        </Button>
      </Flex>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input
                onChange={handleChange}
                ref={initialRef}
                placeholder="Product Name"
                name="productName"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Description</FormLabel>
              <Input
                onChange={handleChange}
                placeholder="Product Description"
                name="productDescription"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Product Weight</FormLabel>
              <Input
                onChange={handleChange}
                placeholder="Product Weight"
                name="weight"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Stock Quantity</FormLabel>
              <Input
                onChange={handleChange}
                placeholder="Stock Quantity"
                name="stockQuantity"
                type="number"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Product Price</FormLabel>
              <Input
                onChange={handleChange}
                placeholder="Product Price"
                name="price"
                type="number"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => createProduct(formData)}
            >
              Add Product
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
              src={
                item?.productImage
                  ? item.productImage
                  : "https://assets.tendercuts.in/product/P/R/63c42955-a41b-45ce-98e1-cb7510eeac4f.jpg"
              }
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
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => deleteProduct(item._id)}
              >
                Delete Product
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}

export default ManagerInventory;
