import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Login from "../Login/Login";
import ChatWindow from "../ChatWindow/ChatWindow";

// chosen background colors
// bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600
//

const Layout = ({ children }) => {
  return (
    <Stack className="bg-gradient-to-r from-black via-gray-900 to-black h-screen w-screen">
      <Box className="flex h-full w-full divide-x divide-zinc-800 ">
        <Box className="flex-none md:flex-1"></Box>
        <Box className="flex-1 flex items-center">{children}</Box>
        <Stack className="flex-1 divide-y divide-zinc-800">
          <Box>
            <Login />
          </Box>
          <Box>
            <ChatWindow />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Layout;
