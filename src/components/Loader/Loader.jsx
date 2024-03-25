import { Box } from "@chakra-ui/react";
import React from "react";
import { MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <Box>
      <MoonLoader color="var(--baseColor)" />
    </Box>
  );
};

export default Loader;
