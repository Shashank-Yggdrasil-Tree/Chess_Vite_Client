import React from 'react';
import Game from '../Game';
import { useSelector } from 'react-redux';
import ResponsiveChessBoard from '../components/ResponsiveChessBoard';
import { selectCurrentToken } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';

const Home = () => {
	const room = useSelector((state) => state.game.room);
	const token = useSelector(selectCurrentToken);
	return <>{token ? <Navigate to="/play-vs-friend" replace={true} /> : room ? <Game /> : <ResponsiveChessBoard />}</>;
};

export default Home;
