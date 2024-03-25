import {
  Box,
  Flex,
  Image,
  Text,
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

import React from "react";
import { IoMdSearch } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";

const Header = () => {
  return (
    <>
      <Flex justifyContent={"space-between"} padding={"2rem"}>
        {/* logo */}
        <Box gap={"1rem"} alignItems={"center"} display={"flex"}>
          <Image
            width={"50px"}
            src="https://shikshaview.com/wp-content/uploads/2020/05/MMU-AMBALA-LOGO.jpg"
          />
          <Text fontSize={"25px"} fontWeight={"700"}>
            MMDU LIBRARY
          </Text>
        </Box>
        {/* searchBar */}
        <Box>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <IoMdSearch />
            </InputLeftElement>
            <Input
              width={"400px"}
              borderRadius={"300px"}
              type="tel"
              placeholder="search a student"
            />
            <InputRightElement>
              <Text
                _hover={{
                  color: "green",
                }}
                cursor={"pointer"}
                transition={"0.2s"}
                color={"var(--baseColor)"}
                fontSize={"30px"}
                padding={0}
                background={"none"}
                size="md"
              >
                <MdKeyboardArrowRight />
              </Text>
            </InputRightElement>
          </InputGroup>
        </Box>
        {/* profile */}
        <Box>
          <Image
            border={" 4px solid grey"}
            borderRadius={"50%"}
            width={"50px"}
            minWidth={"50px"}
            src="https://media.licdn.com/dms/image/D5603AQEhKpMCYO2txw/profile-displayphoto-shrink_800_800/0/1709750037714?e=2147483647&v=beta&t=gWqzqrZoy5Ym95UDYdDYTDHifP9pSWHzfdvO7bUVmJs"
          />
        </Box>
      </Flex>
    </>
  );
};

export default Header;
