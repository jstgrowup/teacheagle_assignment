import { Box, Button, Heading } from "@chakra-ui/react";

function CartButton(AddToCart:any) {
  return (
    <Box>
      <Button bg={"#3d348b"} _hover={{ backgroundColor: "#C11C2D" }}>
        {" "}
        <Heading size={"sm"} color={"white"}>
          ADD TO CART
        </Heading>{" "}
      </Button>
    </Box>
  );
}
export default CartButton;
