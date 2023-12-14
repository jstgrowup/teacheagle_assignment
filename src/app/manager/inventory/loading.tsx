import { Box } from "@chakra-ui/react";
import React from "react";

function Loading() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      w={"100%"}
      alignItems={"center"}
    >
      <img
        src="https://motiongraphicsphoebe.files.wordpress.com/2018/10/tumblr_nurhzkukqo1syz1nro1_500.gif"
        alt=""
      />
    </Box>
  );
}

export default Loading;
