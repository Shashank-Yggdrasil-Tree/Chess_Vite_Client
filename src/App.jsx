import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import socket from './socket';
import Layout from './components/Layout/Layout';
import { setPlayers } from './features/gameSlice';
import Home from './pages/Home';
import StockfishVsStockfish from './pages/StockfishVsStockfish';
import PlayWithComputer from './pages/PlayWithComputer';
import StyledChessBoard from './pages/StyledChessBoard';
import ChessBoard3D from './pages/ChessBoard3D';
import AnalysisBoard from './pages/AnalysisBoard';
import Glassmorphism from './pages/Glassmorphism';
import PlayVsFriend from './pages/PlayVsFriend';
import LayoutIn from './components/Layout/LayoutIn';

// import ProtectedRoute from './components/ProtectedRoute';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Missing from './pages/NotFound';
import { selectCurrentToken } from './features/auth/authSlice';

// const ProtectedRoute = ({ isLoggedIn, children }) => {
// 	const location = useLocation();

// 	if (!isLoggedIn) {
// 		return <Navigate to="/home" state={{ from: location }} replace />;
// 	}
// 	return children;
// };

export default function App() {
	const dispatch = useDispatch();
	const token = useSelector(selectCurrentToken);

	useEffect(() => {
		socket.on('opponentJoined', (roomData) => {
			//console.log('roomData', roomData);
			dispatch(setPlayers(roomData.players));
		});
	}, []);

	return (
		<Routes>
			<Route path="/" element={token ? <LayoutIn /> : <Layout />}>
				{/* persistent routes */}
				{/* new code */}
				<Route element={<PersistLogin />}>
					{/* public routes */}
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/stock-vs-stock" element={<StockfishVsStockfish />} />
					<Route path="/play-vs-comp" element={<PlayWithComputer />} />
					<Route path="/styled" element={<StyledChessBoard />} />
					<Route path="/chess-board-3d" element={<ChessBoard3D />} />
					<Route path="/analysis" element={<AnalysisBoard />} />

					{/* protected routes */}
					<Route element={<RequireAuth />}>
						<Route path="play-vs-friend" element={<PlayVsFriend />} />
					</Route>
				</Route>
			</Route>

			{/* catch all */}
			<Route path="*" element={<Missing />} />
		</Routes>
	);

	// return (
	// 	<>
	// 		<CssBaseline />
	// 		<BrowserRouter>
	// 			<Routes>
	// 				<Route path="/" element={isLoggedIn ? <LayoutIn /> : <Layout />}>
	// 					<Route path="home" element={<Home />} />
	// 					<Route path="stock-vs-stock" element={<StockfishVsStockfish />} />
	// 					<Route path="play-vs-comp" element={<PlayWithComputer />} />
	// 					<Route
	// 						path="play-vs-friend"
	// 						element={
	// 							<ProtectedRoute isLoggedIn={isLoggedIn}>
	// 								<PlayVsFriend />
	// 							</ProtectedRoute>
	// 						}
	// 					/>
	// 					<Route path="styled" element={<StyledChessBoard />} />
	// 					<Route path="chess-board-3d" element={<ChessBoard3D />} />
	// 					<Route path="analysis" element={<AnalysisBoard />} />
	// 					<Route path="glassmorphism" element={<Glassmorphism />} />
	// 				</Route>
	// 			</Routes>
	// 		</BrowserRouter>
	// 	</>
	// );
}
