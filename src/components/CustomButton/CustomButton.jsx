import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({ children, handleClick }) => {
  return (
    <Button
      variant="contained"
      className="bg-gradient-to-r from-violet-800 to-fuchsia-700 focus:outline-none focus:ring focus:ring-violet-300"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
