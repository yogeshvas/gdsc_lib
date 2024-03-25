import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
  Input,
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import { FiBook } from "react-icons/fi";
import { TbRefresh } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

const AllBooks = ({ onOpen }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/books/getallbooks",
          {
            headers: {
              Cookie: document.cookie, // Send all cookies with the request
            },
          }
        );
        setBooks(response.data.books);
        setLoading(false);
      } catch (error) {
        setError("Error fetching books. Please try again later.");
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [refresh]);

  useEffect(() => {
    // Filter books based on searchTerm
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const handleRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Box padding={"1rem"}>
        <Text color={"var(--baseColor)"} fontSize={"40px"} fontWeight={"600"}>
          Books Inventory.
        </Text>
        <Flex alignItems={"center"}>
          <InputGroup margin={"1rem"}>
            <InputLeftElement>
              <FiBook color=" var(--baseColor)" />
            </InputLeftElement>
            <Input
              placeholder="Search a book"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>
          <Button onClick={handleRefresh}>
            <Flex gap={"10px"} alignItems={"center"} margin={"1rem"}>
              <TbRefresh />
              Refresh
            </Flex>
          </Button>
          <Button margin={"1rem"} onClick={onOpen}>
            <Flex gap={"10px"} alignItems={"center"}>
              <MdAdd />
              Add Book
            </Flex>
            <MdAdd />
          </Button>
        </Flex>
      </Box>
      {!loading ? (
        <TableContainer>
          <Table variant="striped" colorScheme={"red"}>
            <TableCaption>@ MMDU LIBRARY MANAGEMENT SYSTEM.</TableCaption>
            <Thead>
              <Tr>
                <Th>Book Title</Th>
                <Th>ISBN Number</Th>
                <Th>Author</Th>
                <Th isNumeric>Quantity</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredBooks.reverse().map((book, index) => (
                <Tr key={index}>
                  <Td>{`${book.title.slice(0, 30)}`}</Td>
                  <Td>{book.isbn}</Td>
                  <Td>{book.author}</Td>
                  <Td isNumeric>{book.quantity}</Td>
                  <Td isNumeric>
                    <Button onClick={handleDeleteBook}>
                      <MdOutlineDeleteOutline />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Flex paddingX={"1rem"}>
          <Loader />
        </Flex>
      )}
      {error && (
        <Box mt={4} textAlign="center" color="red">
          {error}
        </Box>
      )}
    </>
  );
};

export default AllBooks;
