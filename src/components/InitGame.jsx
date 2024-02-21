import { Box, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import CustomDialog from './CustomDialog.jsx';
import socket from '../socket.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setRoom, setOrientation, setPlayers } from '../features/gameSlice';
import CustomButton from './CustomButton';
import TooltipWrapper from '../common/TooltipWrapper.jsx';
import StyledLinkText from '../common/StyledLinkText.jsx';
import { useLogoutQuery } from '../features/auth/authApiSlice.jsx';

function InitGame() {
	const [skip, setSkip] = useState(true);
	const { data, error, status } = useLogoutQuery(undefined, { skip });
	const [roomDialogOpen, setRoomDialogOpen] = useState(false);
	const [roomInput, setRoomInput] = useState('');
	const [roomError, setRoomError] = useState('');

	const dispatch = useDispatch();

	const handleLogout = () => {
		socket.emit('logout');
		setSkip((prev) => !prev);
		// dispatch logOut
	};

	return (
		<Stack justifyContent="center" alignItems="center" className="h-full relative" sx={{ py: 1 }}>
			{status}
			<TooltipWrapper tooltipContent="Logout" placement="right">
				<img
					className="absolute top-0 left-0 w-8 m-2 cursor-pointer transition ease-in-out hover:scale-110 duration-150"
					src="/svg_icons/logout.svg"
					alt="Logout"
					onClick={handleLogout}
				/>
			</TooltipWrapper>
			<CustomDialog
				open={roomDialogOpen}
				handleClose={() => setRoomDialogOpen(false)}
				title="Select Room to Join"
				contentText="Enter a valid room ID to join the room"
				handleContinue={() => {
					// Join a room
					if (!roomInput) return; // if given room input is valid, do nothing.
					socket.emit('joinRoom', { roomId: roomInput }, (r) => {
						// r is the response from the server
						if (r.error) return setRoomError(r.message); // if an error is returned in the response set roomError to the error message and exit
						dispatch(setRoom(r?.roomId));
						dispatch(setPlayers(r?.players));
						dispatch(setOrientation('black'));
						setRoomDialogOpen(false); // close dialog
					});
				}}
			>
				<TextField
					autoFocus
					margin="dense"
					id="room"
					label="Room ID"
					name="room"
					value={roomInput}
					required
					onChange={(e) => setRoomInput(e.target.value)}
					type="text"
					fullWidth
					variant="standard"
					error={Boolean(roomError)}
					helperText={!roomError ? 'Enter a room ID' : `Invalid room ID: ${roomError}`}
				/>
			</CustomDialog>
			{/* Button for starting a game */}
			<CustomButton
				handleClick={() => {
					socket.emit('createRoom', (r) => {
						//console.log(r);
						dispatch(setRoom(r));
						dispatch(setOrientation('white'));
					});
				}}
			>
				Start a game
			</CustomButton>
			{/* Button for joining a game */}
			<StyledLinkText onClick={() => setRoomDialogOpen(true)}>JOIN A GAME</StyledLinkText>
		</Stack>
	);
}

export default InitGame;
