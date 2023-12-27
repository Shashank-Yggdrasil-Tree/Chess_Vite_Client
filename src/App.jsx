import { Box } from "@mui/material";
import Game from "./Game";
import { useEffect } from "react";
import socket from "./socket.jsx";
import { Chessboard } from "react-chessboard";
import Layout from "./components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { setPlayers } from "./features/gameSlice/gameSlice.jsx";

export default function App() {
  const room = useSelector((state) => state.game.room);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("opponentJoined", (roomData) => {
      console.log("roomData", roomData);
      dispatch(setPlayers(roomData.players));
    });
  }, []);

  return (
    <>
      <Layout>
        {room ? (
          <Game />
        ) : (
          <Box className="max-w-lg max-h-lg grow">
            <Chessboard />
          </Box>
        )}
      </Layout>
    </>
  );
}
