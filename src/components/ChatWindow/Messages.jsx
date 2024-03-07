import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

const Messages = ({ selectedTheme }) => {
	// const message = useSelector((state) => state.chat.message);

	// const message = [
	// 	{
	// 		id: 1,
	// 		text: 'H',
	// 		username: 'AI',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'Please guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide mePlease guide me',
	// 		username: 'Human',
	// 	},
	// 	{
	// 		id: 1,
	// 		text: 'Hello There!',
	// 		username: 'AI',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'Please guide me',
	// 		username: 'Human',
	// 	},
	// 	{
	// 		id: 1,
	// 		text: 'Hello There!',
	// 		username: 'AI',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'Please guide me',
	// 		username: 'Human',
	// 	},
	// 	{
	// 		id: 1,
	// 		text: 'Hello There!',
	// 		username: 'AI',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'Please guide me',
	// 		username: 'Human',
	// 	},
	// 	{
	// 		id: 1,
	// 		text: 'Hello There!',
	// 		username: 'AI',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'Please guide me',
	// 		username: 'Human',
	// 	},
	// 	{
	// 		id: 1,
	// 		text: 'Hello There!',
	// 		username: 'AI',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'Please guide me',
	// 		username: 'Human',
	// 	},
	// 	{
	// 		id: 1,
	// 		text: 'lksdnvlkdsnfvldnf!',
	// 		username: 'AI',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'Please guide me',
	// 		username: 'Human',
	// 	},
	// 	{
	// 		id: 1,
	// 		text: 'lksdnvlkdsnfvldnf!',
	// 		username: 'AI',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'Please guide me',
	// 		username: 'Human',
	// 	},
	// 	{
	// 		id: 1,
	// 		text: 'lksdnvlkdsnfvldnf!',
	// 		username: 'AI',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'Please guide me',
	// 		username: 'Human',
	// 	},
	// 	{
	// 		id: 1,
	// 		text: 'kmdlknsldknvre!',
	// 		username: 'AI',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'Please guide me',
	// 		username: 'Human',
	// 	},
	// 	{
	// 		id: 1,
	// 		text: 'kmdlknsldknvre!',
	// 		username: 'AI',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'Please guide me',
	// 		username: 'Human',
	// 	},
	// 	{
	// 		id: 1,
	// 		text: 'kmdlknsldknvre!',
	// 		username: 'AI',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'sdsdfsdfsdf me',
	// 		username: 'Human',
	// 	},
	// 	{
	// 		id: 1,
	// 		text: 'kmdlknsldknvre!',
	// 		username: 'AI',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'sdsdfsdfsdf me',
	// 		username: 'Human',
	// 	},
	// ];

	const message = [];

	// const { username: senderUsername } = useSelector((state) => state.game);
	const { username: senderUsername } = 'Human';

	return (
		<Box className="flex flex-col-reverse h-full">
			<Box className="flex flex-col pb-20 overflow-y-scroll no-scrollbar pt-2">
				{message
					? message.map(({ id, text, username }) => (
							<div
								key={id}
								className={`font-sans text-md font-light w-fit p-2 min-w-20 max-w-80 rounded mx-2 pointer-events-none select-none ${
									username === 'Human'
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
