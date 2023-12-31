import { Box } from "@mui/material";
import { Chessboard } from "react-chessboard";
import React from "react";

const ResponsiveChessBoard = ({
  id,
  position,
  onPieceDrop,
  boardOrientation = "white",
  styled = false,
}) => {
  return (
    <Box className="max-w-lg max-h-lg grow">
      <Chessboard
        id={id}
        position={position}
        onPieceDrop={onPieceDrop}
        boardOrientation={boardOrientation}
        {...(styled
          ? {
              customBoardStyle: {
                borderRadius: "4px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
              },
              customDarkSquareStyle: { backgroundColor: "#779952" },
              customLightSquareStyle: { backgroundColor: "#edeed1" },
            }
          : {})}
      />
    </Box>
  );
};

export default ResponsiveChessBoard;
