import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import { Context } from "./main";
import Students from "./pages/Students/Students";
import Books from "./pages/Books/Books";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import IssuedTransaction from "./pages/IssuedTransactions/IssuedTransaction";
import Cookies from "js-cookie";

function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated, setLoading } =
    useContext(Context);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);
  return (
    <>
      {!isAuthenticated ? (
        <>
          <Login />
        </>
      ) : (
        <>
          <Box>
            <Header />
          </Box>
          <Flex>
            <Sidebar />
            <Box
              borderRadius={"20px"}
              margin={"1rem"}
              backgroundColor={"#F9F9F9"}
              width={"84vw"}
              height={"80vh"}
              overflow={"scroll"}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Home />} />
                <Route path="/students" element={<Students />} />
                <Route path="/books" element={<Books />} />
                <Route path="/issue" element={<IssuedTransaction />} />
              </Routes>
            </Box>
          </Flex>
        </>
      )}
    </>
  );
}

export default App;
