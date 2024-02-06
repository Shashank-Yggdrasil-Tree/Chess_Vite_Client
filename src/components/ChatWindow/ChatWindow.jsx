import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import { addMessage } from '../../features/chatSlice';
import socket from '../../socket';
import CommonBoxWrapper from '../../common/CommonBoxWrapper';
import Messages from './Messages';
import Form from './Form';
// import { useGetUsersQuery } from '../../features/auth/authApiSlice';

const ChatWindow = () => {
	// const { data, isLoading, isError, isSuccess } = useGetUsersQuery();

	const dispatch = useDispatch();

	useEffect(() => {
		const handleReceivedMessage = (message) => {
			dispatch(addMessage(message));
		};

		socket.on('messageRecieved', handleReceivedMessage);
		// clean up to avoid multiple renders

		return () => {
			socket.off('messageRecieved', handleReceivedMessage);
		};
	}, [dispatch]);

	// if (isLoading) {
	// 	return 'Loading...';
	// }

	// if (isError) {
	// 	return 'Something went wrong';
	// }

	// // you can add isFetching to a skeleton of the thing

	// if (isSuccess) {
	return (
		<CommonBoxWrapper additional_class="relative h-full bg-[#092635] p-5">
			<Box className="bg-[#1B4242] h-full overflow-y-scroll">
				<Messages />
				<Form />
			</Box>
		</CommonBoxWrapper>
	);
};
// };

export default ChatWindow;
