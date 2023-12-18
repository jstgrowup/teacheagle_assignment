import { Box, Flex } from "@chakra-ui/react";
import React from "react";

function Loading() {
  return (
    <Flex
      w={"inherit"}
      alignItems={"center"}
      justifyContent={"center"}
      className="w-full flex items-center justify-center"
    >
      <img
        src="https://motiongraphicsphoebe.files.wordpress.com/2018/10/tumblr_nurhzkukqo1syz1nro1_500.gif"
        alt=""
      />
    </Flex>
  );
}

export default Loading;
