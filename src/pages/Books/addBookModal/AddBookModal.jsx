import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Box,
  FormControl,
  useToast,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";

const AddBookModal = ({ onClose, isOpen }) => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [publication, setPublication] = useState("");
  const [quantity, setQuantity] = useState("");
  const toast = useToast();
  const addBookHandler = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your server using Axios
      const response = await axios.post(
        "http://localhost:8080/api/v1/books/addBook",
        {
          title,
          author: authorName,
          isbn: isbnNumber,
          quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Check if the request was successful
      if (response.status === 201) {
        console.log("Book added successfully:", response.data.book);
        // Close the modal or do any other necessary action
        onClose();
        toast({
          title: "Book added successfully",
          status: "success",
          duration: 5000, // 5 seconds
          isClosable: true,
        });
        setTitle("");
        setAuthorName("");
        setIsbnNumber("");
        setQuantity("");
        setPublication("");
      } else {
        console.log("Error adding book1:", response.data.error);
        // Handle the error (display error message, etc.)
        toast({
          title: `Error Creating the Book`,
          status: "error",
          duration: 5000, // 5 seconds
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: `Error or Book Already Exist`,
        status: "error",
        duration: 5000, // 5 seconds
        isClosable: true,
      });
      // Handle the error (display error message, etc.)
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} size={"xl"} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new book.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Box padding={"10px"}>
                <FormLabel>Title</FormLabel>
                <Input
                  variant="filled"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Book Title"
                />
              </Box>
              <Box padding={"10px"}>
                <FormLabel>Author</FormLabel>

                <Input
                  variant="filled"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Author Name"
                />
              </Box>
              <Box padding={"10px"}>
                <FormLabel>ISBN Number</FormLabel>
                <Input
                  value={isbnNumber}
                  onChange={(e) => setIsbnNumber(e.target.value)}
                  variant="filled"
                  placeholder="ISBN Number"
                />
              </Box>
              <Box padding={"10px"}>
                <FormLabel>Publication</FormLabel>
                <Input
                  value={publication}
                  onChange={(e) => setPublication(e.target.value)}
                  variant="filled"
                  placeholder="Publication"
                />
              </Box>
              <Box padding={"10px"}>
                <FormLabel>Quantity</FormLabel>
                <Input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  variant="filled"
                  placeholder="Quantity"
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              onClick={addBookHandler}
              color={"green"}
              variant="ghost"
            >
              Add Book
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddBookModal;
