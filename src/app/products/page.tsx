"use client";

import Navbar from "@/components/navbar";
import ProductCard from "@/components/productCard";
import { Flex, SimpleGrid, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
const getProducts = async () => {
  try {
    const result = await axios.get("/api/inventory");

    return result?.data?.data;
  } catch (error) {
    return error;
  }
};
function Products() {
  const toast = useToast();
  const [data, setdata] = useState<any>([]);
  const [bool, setbool] = useState(false);
  useEffect(() => {
    getProducts()
      .then((res) => setdata(res))
      .catch((err) => console.log(err));
  }, [bool]);

  async function AddToCart(productId: any) {
    try {
      await axios.post("/api/cart", { productId });
      setbool(!bool);
      toast({
        title: "Product Added To cart",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } catch (error) {
      console.log("error:", error);
    }
  }
  return (
    <>
      <Navbar />
      <Flex direction={"column"} mt={10}>
        <Flex
          gap={"6"}
          m={"auto"}
          w={["100%", "95%", "90%", "85%"]}
          direction={"column"}
          align={"flex-start"}
        >
          <SimpleGrid
            columns={[1, 1, 2, 2, 3]}
            color={"#565968"}
            fontFamily={"sans-serif"}
            // spacing="12"
            gap={"12"}
          >
            {data?.map((item: any) => {
              return (
                <div key={item._id}>
                  <ProductCard {...item} AddToCart={AddToCart} />
                </div>
              );
            })}
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}
export default Products;
