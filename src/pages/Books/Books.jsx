import { Box, Button, useDisclosure } from "@chakra-ui/react";

import React, { useState } from "react";
import AddBookModal from "./addBookModal/AddBookModal";
import AllBooks from "./addBookModal/AllBooks";
import Cookies from "js-cookie";

const Books = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Box>
        <AddBookModal isOpen={isOpen} onClose={onClose} />
      </Box>
      <AllBooks onOpen={onOpen} />
    </div>
  );
};

export default Books;
