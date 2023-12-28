// import { Box } from "@mui/material";
// import Game from "./Game";
// import { useEffect } from "react";
// import socket from "./socket.jsx";
// import { Chessboard } from "react-chessboard";
// import Layout from "./components/Layout/Layout";
// import { useSelector, useDispatch } from "react-redux";
// import { setPlayers } from "./features/gameSlice/gameSlice.jsx";
// import { StockfishVsStockfish } from "./components/StockfishVsStockfish/StockfishVsStockfish.jsx";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// export default function App() {
//   const room = useSelector((state) => state.game.room);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const stockfish = new Worker("./stockfish.js");
//     const DEPTH = 8; // number of halfmoves the engine looks ahead
//     const FEN_POSITION =
//       "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

//     stockfish.postMessage("uci");
//     stockfish.postMessage(`position fen ${FEN_POSITION}`);
//     stockfish.postMessage(`go depth ${DEPTH}`);

//     stockfish.onmessage = (e) => {
//       console.log(e.data); // in the console output you will see `bestmove e2e4` message
//     };
//   }, []);

//   useEffect(() => {
//     socket.on("opponentJoined", (roomData) => {
//       console.log("roomData", roomData);
//       dispatch(setPlayers(roomData.players));
//     });
//   }, []);

//   return (
//     <>
//       <Layout>
//         {room ? (
//           <Game />
//         ) : (
//           <Box className="max-w-lg max-h-lg grow">
//             <Chessboard />
//           </Box>
//         )}
//       </Layout>
//       {/* <StockfishVsStockfish /> */}
//     </>
//   );
// }

import { Box } from "@mui/material";
import Game from "./Game";
import { useEffect } from "react";
import socket from "./socket.jsx";
import { Chessboard } from "react-chessboard";
import Layout from "./components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { setPlayers } from "./features/gameSlice/gameSlice.jsx";
import { StockfishVsStockfish } from "./components/StockfishVsStockfish/StockfishVsStockfish.jsx";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import PlayWithComputer from "./components/PlayWithComputer/PlayWithComputer.jsx";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function App() {
  const room = useSelector((state) => state.game.room);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("opponentJoined", (roomData) => {
      console.log("roomData", roomData);
      dispatch(setPlayers(roomData.players));
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="stockstock"
              element={
                <StockfishVsStockfish />
                // <ProtectedRoute isLoggedIn={isLoggedIn}>
                // </ProtectedRoute>
              }
            />
            <Route path="playvcomp" element={<PlayWithComputer />} />
          </Route>
        </Routes>
        {/* <Layout>
          {room ? (
            <Game />
          ) : (
            <Box className="max-w-lg max-h-lg grow">
              <Chessboard />
            </Box>
          )}
        </Layout> */}
        {/* <StockfishVsStockfish /> */}
      </BrowserRouter>
    </>
  );
}
