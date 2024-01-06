import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Login from "../Login/Login";
import ChatWindow from "../ChatWindow/ChatWindow";
import { Outlet, useLocation, useParams } from "react-router-dom";
import ResponsiveDrawer from "../../Drawer/Drawer";

// chosen background colors
// bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600
// bg-gradient-to-r from-black via-gray-900 to-black

const Layout = () => {
  const location = useLocation().pathname;
  console.log(location);

  return (
    <Stack className="bg-hero-pattern bg-no-repeat bg-center bg-cover h-screen w-screen">
      <Box className="flex h-full w-full ">
        <Box className="flex-none md:flex-1">
          <ResponsiveDrawer />
        </Box>
        <Box className="flex-1 flex items-center">
          <Outlet />
          {/* {children} */}
        </Box>
        {location === "/playvfriend" ? (
          <Stack className="flex-1">
            <Box>
              <Login />
            </Box>
            <Box className="h-full w-full">
              <ChatWindow />
            </Box>
          </Stack>
        ) : (
          <Stack className="flex-1"></Stack>
        )}
      </Box>
    </Stack>
  );
};

export default Layout;
