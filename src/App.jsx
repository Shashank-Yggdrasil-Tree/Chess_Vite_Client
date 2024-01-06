import { Box, CssBaseline } from "@mui/material";
import { useEffect } from "react";
import socket from "./socket.jsx";
import Layout from "./components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { setPlayers } from "./features/gameSlice/gameSlice.jsx";
import { StockfishVsStockfish } from "./components/StockfishVsStockfish/StockfishVsStockfish.jsx";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import PlayWithComputer from "./components/PlayWithComputer/PlayWithComputer.jsx";
import PlayWithFriend from "./components/PlayWithFriend/PlayWithFriend.jsx";
import StyledChessBoard from "./components/StyledChessBoard/StyledChessBoard.jsx";
import ChessBoard3D from "./components/ChessBoard3D/ChessBoard3D.jsx";
import AnalysisBoard from "./components/AnalysisBoard/AnalysisBoard.jsx";
import Glassmorphism from "./components/Glassmorphism/Glassmorphism.jsx";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("opponentJoined", (roomData) => {
      console.log("roomData", roomData);
      dispatch(setPlayers(roomData.players));
    });
  }, []);

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="stockstock" element={<StockfishVsStockfish />} />
            <Route path="playvcomp" element={<PlayWithComputer />} />
            <Route path="playvfriend" element={<PlayWithFriend />} />
            <Route path="styled" element={<StyledChessBoard />} />
            <Route path="ChessBoard3D" element={<ChessBoard3D />} />
            <Route path="analysis" element={<AnalysisBoard />} />
            <Route path="glassmorphism" element={<Glassmorphism />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
