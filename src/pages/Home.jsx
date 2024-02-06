import React from 'react';
import Game from '../Game';
import { useSelector } from 'react-redux';
import ResponsiveChessBoard from '../components/ResponsiveChessBoard';

const Home = () => {
	const room = useSelector((state) => state.game.room);
	return <>{room ? <Game /> : <ResponsiveChessBoard />}</>;
};

export default Home;
