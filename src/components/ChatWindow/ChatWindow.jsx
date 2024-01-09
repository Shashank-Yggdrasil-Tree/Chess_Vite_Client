import React, { useEffect } from 'react';
import CommonBoxWrapper from '../../common/CommonBoxWrapper/CommonBoxWrapper';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket';
import { addMessage } from '../../features/chatSlice/chatSlice';
import Messages from './Messages';
import Form from './Form';

const ChatWindow = () => {
  const { username: senderUsername } = useSelector((state) => state.game);

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

  return (
    <CommonBoxWrapper additional_class="relative h-full bg-[#092635] p-5">
      <Box className="bg-[#1B4242] h-full">
        <Messages senderUsername={senderUsername} />
        <Form />
      </Box>
    </CommonBoxWrapper>
  );
};

export default ChatWindow;
