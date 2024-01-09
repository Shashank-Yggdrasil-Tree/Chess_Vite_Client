import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({ children, handleClick }) => {
  return (
    <Button
      variant="contained"
      className="bg-violet-800 focus:outline-none focus:ring focus:ring-violet-300 hover:bg-gradient-to-r from-violet-800 to-fuchsia-700 hover:text-white transition ease-in-out hover:scale-110 duration-150"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
