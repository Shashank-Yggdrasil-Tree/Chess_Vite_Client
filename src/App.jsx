import { Box, CssBaseline } from "@mui/material";
import { useEffect } from "react";
import socket from "./socket.jsx";
import Layout from "./components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { setPlayers } from "./features/gameSlice/gameSlice.jsx";
import { StockfishVsStockfish } from "./pages/StockfishVsStockfish/StockfishVsStockfish.jsx";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import PlayWithComputer from "./pages/PlayWithComputer/PlayWithComputer.jsx";
import PlayWithFriend from "./pages/PlayWithFriend/PlayWithFriend.jsx";
import StyledChessBoard from "./pages/StyledChessBoard/StyledChessBoard.jsx";
import ChessBoard3D from "./pages/ChessBoard3D/ChessBoard3D.jsx";
import AnalysisBoard from "./pages/AnalysisBoard/AnalysisBoard.jsx";
import Glassmorphism from "./pages/Glassmorphism/Glassmorphism.jsx";

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
