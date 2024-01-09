import React from "react";
import Game from "../../Game";
import { Box } from "@mui/material";
import { Chessboard } from "react-chessboard";
import { useSelector } from "react-redux";
import ResponsiveChessBoard from "../../components/ResponsiveChessBoard/ResponsiveChessBoard";

const PlayWithFriend = () => {
  const room = useSelector((state) => state.game.room);
  return <>{room ? <Game /> : <ResponsiveChessBoard />}</>;
};

export default PlayWithFriend;
