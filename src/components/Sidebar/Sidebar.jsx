import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Flex, Text, VStack, useToast } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaBook } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { MdExitToApp } from "react-icons/md";
import { Context } from "../../main";
import axios from "axios";
import { GrTransaction } from "react-icons/gr";

const Sidebar = () => {
  const { setUser, isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const toast = useToast();
  // Retrieve active link from local storage or set default value
  const [activeLink, setActiveLink] = useState(
    localStorage.getItem("activeLink") || "/student/home"
  );
  const logoutHandler = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/admin/logout",

        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(false);
      setUser(null);
      toast({
        title: `Logged Out Successfully `,
        status: "success",
        duration: 5000, // 5 seconds
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setIsAuthenticated(true);
    }
  };
  const SidebarComponents = [
    {
      name: "Dashboard",
      link: "/",
      icon: <IoHome />,
    },
    {
      name: "Students",
      link: "/students",
      icon: <IoMdPerson />,
    },
    {
      name: "Books",
      link: "/books",
      icon: <FaBook />,
    },
    {
      name: "Issue Transactions",
      link: "/issue",
      icon: <GrTransaction />,
    },
  ];

  // Update active link in local storage when it changes
  useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Box
      transition="width 0.5s ease, border 0.5s ease"
      minWidth={{ base: "300px" }}
      height={"85vh"}
      width={"16vw"}
      fontSize={"1rem"}
      padding={"2rem"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Flex padding={"0.5rem"} flexDirection={"column"}>
        {SidebarComponents.map((item) => (
          <Box key={item.link} minWidth="10rem">
            <NavLink
              activeClassName="active-link"
              style={{ textDecoration: "none" }}
              to={item.link}
              onClick={() => handleLinkClick(item.link)}
            >
              <Flex
                justifyContent={"normal"}
                padding={"0.5rem"}
                alignItems={"center"}
                gap={"1rem"}
                fontWeight={500}
                marginY={"0.2rem"}
                borderRadius={"1rem"}
                transition={"0.2s"}
                border={activeLink === item.link ? "0.1px solid gray" : "none"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  backgroundColor="#e63838"
                  padding={"0.5rem"}
                  borderRadius={"50%"}
                  opacity={activeLink === item.link ? "100%" : "70%"}
                >
                  <Text color="white">{item.icon}</Text>
                </Box>
                <Text>{item.name}</Text>
              </Flex>
            </NavLink>
          </Box>
        ))}
      </Flex>
      <Box>
        <VStack>
          <Button
            _hover={{}}
            background={"none"}
            color={"var(--baseColor)"}
            display={"flex"}
            gap={"5px"}
            onClick={logoutHandler}
          >
            <MdExitToApp fontSize={"2rem"} />
            <Text>Logout</Text>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Sidebar;
