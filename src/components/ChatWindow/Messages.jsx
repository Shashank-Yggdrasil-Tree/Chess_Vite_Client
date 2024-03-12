import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { selectCurrentUser } from '../../features/auth/authSlice';

const Messages = ({ selectedTheme }) => {
	const message = useSelector((state) => state.chat.message);
	const senderUsername = useSelector(selectCurrentUser);

	return (
		<Box className="flex flex-col-reverse h-full">
			<Box className="flex flex-col pb-20 overflow-y-auto no-scrollbar pt-2">
				{message
					? message.map(({ id, text, username }) => (
							<div
								key={id}
								className={`font-sans text-md font-light w-fit p-2 min-w-20 max-w-80 rounded mx-2 mb-2 pointer-events-none select-none ${
									username === senderUsername
										? `text-white text-start ${selectedTheme.send_msg} self-end`
										: `text-black text-start ${selectedTheme.receive_msg}`
								}`}
							>
								<span className="font-baseline">
									{username}: {text}
								</span>
							</div>
						))
					: null}
			</Box>
		</Box>
	);
};

export default Messages;
