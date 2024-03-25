import {
  Box,
  Button,
  Flex,
  Image,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import { GoEye } from "react-icons/go";
import { LuEyeOff } from "react-icons/lu";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  //register Submission
  const RegisterHandler = async (e) => {
    console.log({ email, name, password });
  };

  //   to togge password visibility
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div>
      <Box
        backgroundColor={"#f8f8f8"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={{ base: "100vw" }}
        height={{ base: "100vh" }}
      >
        <Box
          padding={"30px"}
          borderRadius={"6px"}
          backgroundColor={"white"}
          width={{ base: "100vw", sm: "400px", lg: "400px" }}
          height={{ base: "100vh", sm: "600px" }}
          boxShadow={
            " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
          }
        >
          {/* input elements */}
          <Flex flexDirection={"column"}>
            <Box marginTop={"40px"}>
              <VStack>
                <Image
                  width={"200px"}
                  src="https://s3-ap-south-1.amazonaws.com/assets-edorer/MMDULandingPage/images/logo.png"
                />
                <Text
                  fontWeight={"500"}
                  fontSize={{ base: "30px", sm: "40px" }}
                >
                  Register
                </Text>
              </VStack>
            </Box>
            <Box marginTop={"20px"}>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                marginY={"10px"}
                placeholder="Name"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                marginY={"10px"}
                placeholder="Enter Email"
              />

              <InputGroup marginY={"10px"} size="md">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  padding={"20px"}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShow}>
                    {show ? <LuEyeOff /> : <GoEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
            <Flex
              marginY={"10px"}
              padding={"10px"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text color={"blue"} fontSize={"15px"}>
                Forgot Password ?
              </Text>
              <Button
                _hover={{
                  color: "var(--baseColor)",
                  backgroundColor: "#F8F8F8",
                }}
                color={"white"}
                backgroundColor={"var(--baseColor)"}
                type="submit"
                onClick={RegisterHandler}
              >
                Submit
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
