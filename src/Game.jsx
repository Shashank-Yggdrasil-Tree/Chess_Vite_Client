import { useState, useMemo, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';
import CustomDialog from './components/CustomDialog.jsx';
import socket from './socket';
import {
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	Stack,
	Typography,
	Box,
	Divider,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setRoom, setOrientation, setPlayers } from './features/gameSlice.jsx';
import ResponsiveChessBoard from './components/ResponsiveChessBoard.jsx';
import { selectCurrentToken, selectCurrentUser } from './features/auth/authSlice.jsx';
import { setMessages } from './features/chatSlice.jsx';

function Game({ responsiveClass }) {
	const token = useSelector(selectCurrentToken);
	const room = useSelector((state) => state.game.room);
	const orientation = useSelector((state) => state.game.orientation);
	const players = useSelector((state) => state.game.players);
	const challenger = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

	const cleanup = useCallback(() => {
		dispatch(setRoom(''));
		dispatch(setOrientation(''));
		dispatch(setPlayers([]));
		dispatch(setMessages([]));
	}, []);

	const chess = useMemo(() => new Chess(), []);
	const [fen, setFen] = useState(chess.fen());

	const [over, setOver] = useState(''); // only empty string is false in js and this state value is also used as the title&Content of Dialog

	const makeAMove = useCallback(
		(move) => {
			try {
				const result = chess.move(move); // update Chess instance
				setFen(chess.fen()); // update fen state to trigger a re-render

				//console.log('over, checkmate', chess.isGameOver(), chess.isCheckmate());

				if (chess.isGameOver()) {
					// check if move led to "game over"
					if (chess.isCheckmate()) {
						// if reason for game over is a checkmate
						// Set message to checkmate.
						setOver(`Checkmate! ${chess.turn() === 'w' ? 'black' : 'white'} wins!`);
						// The winner is determined by checking which side made the last move
					} else if (chess.isDraw()) {
						// if it is a draw
						setOver('Draw'); // set message to "Draw"
					} else {
						setOver('Game over');
					}
				}

				return result;
			} catch (e) {
				return null;
			} // null if the move was illegal, the move object if the move was legal
		},
		[chess]
	);

	function onDrop(sourceSquare, targetSqaure) {
		// orientation is either 'white' or 'black'. game.turn() returns 'w' or 'b'
		//console.log('orientation[0]', orientation[0]);
		//console.log('chess.turn()', chess.turn());
		if (chess.turn() !== orientation[0]) return false; // <- 1 prohibit player from moving piece of other player

		if (players.length < 2) return false; // <- 2 disallow a move if the opponent has not joined

		const moveData = {
			from: sourceSquare,
			to: targetSqaure,
			color: chess.turn(),
			promotion: 'q', // promote to queen where possible
		};

		const move = makeAMove(moveData);

		if (move === null) return false;

		socket.emit('move', {
			// <- 3 emit a move event.
			move,
			room,
		}); // this event will be transmitted to the opponent via the server
		//console.log('making a move', move, room);

		return true;
	}

	useEffect(() => {
		socket.on('move', (move) => {
			//console.log(move);
			makeAMove(move); //
		});
	}, [makeAMove]);

	useEffect(() => {
		socket.on('playerDisconnected', (player) => {
			setOver(`${player.username} has disconnected`); // set game over
		});
	}, []);

	useEffect(() => {
		socket.on('closeRoom', ({ roomId }) => {
			if (roomId === room) {
				cleanup();
			}
		});
	}, [room, cleanup]);

	const challengee = players.filter((p) => p?.username !== challenger)[0]?.username;
	// {challengee || <>waiting for the player to join</>}
	// {challenger}

	return (
		<>
			<Stack className="grow h-full w-full flex justify-center items-center">
				<ResponsiveChessBoard
					id="pvfchessboard"
					position={fen}
					onPieceDrop={onDrop}
					boardOrientation={orientation}
					styled={!!token}
					customClassName={token ? responsiveClass : null}
				/>
				{/* <p className="text-white capitalize">Shashank</p> */}
			</Stack>
			<CustomDialog // Game Over CustomDialog
				open={Boolean(over)}
				title={over}
				contentText={over}
				handleContinue={() => {
					// setOver('');
					socket.emit('closeRoom', { roomId: room });
					cleanup();
				}}
			/>
		</>
	);
}

export default Game;
