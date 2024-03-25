import {
  Box,
  Button,
  Flex,
  Image,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Input } from "@chakra-ui/react";
import { GoEye } from "react-icons/go";
import { LuEyeOff } from "react-icons/lu";
import axios from "axios";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    loading,
    setLoading,
  } = useContext(Context);
  //
  const toast = useToast();
  const handleShow = () => {
    setShow(!show);
  };
  //
  // const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
  //   useContext(Context);

  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log({ empId, password });
    try {
      const { data } = await axios.post(
        "/api/v1/admin/login",
        {
          empId,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data.admin);
      setUser(data.admin);
      setIsAuthenticated(true);
      const token = Cookies.get("token");
      localStorage.setItem("token", token);
      toast({
        title: `Logged in as ${data.admin.name} `,
        status: "success",
        duration: 5000, // 5 seconds
        isClosable: true,
      });
      // Redirect to the home page after successful login
      // history.push("/");
    } catch (error) {
      // console.log(error.reponse.message);
      toast({
        title: `Invalid login Credentials `,
        status: "error",
        duration: 5000, // 5 seconds
        isClosable: true,
      });
    }
  };
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div>
      <Box
        backgroundColor={"#F8f8f8"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={{ base: "100vw" }}
        height={{ base: "100vh" }}
      >
        <Box
          padding={"30px"}
          borderRadius={"1.5rem"}
          backgroundColor={"white"}
          width={{ base: "100vw", sm: "30vw", md: "60vw", lg: "30vw" }}
          height={{ base: "100vh", sm: "80vh" }}
          boxShadow={
            " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
          }
          // minWidth={"400px"}
          minHeight={"80vh"}
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
                  Login
                </Text>
              </VStack>
            </Box>
            <Box marginTop={"20px"}>
              <Input
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
                marginY={"10px"}
                placeholder="Enter Employee Id"
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
                onClick={submitHandler}
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

export default Login;
