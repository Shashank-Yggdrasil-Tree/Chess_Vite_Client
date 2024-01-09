import { useDispatch, useSelector } from 'react-redux';
import MessageInput from './MessageInput';
import socket from '../../socket';
import { addMessage } from '../../features/chatSlice/chatSlice';
import { setInput } from '../../features/chatSlice/chatSlice';
import { Box, Button } from '@mui/material';

const Form = () => {
  const { username: senderUsername, room } = useSelector((state) => state.game);
  const input = useSelector((state) => state.chat.input);

  const dispatch = useDispatch();

  const onClickSend = () => {
    socket.emit(
      'message',
      {
        username: senderUsername,
        messageText: input,
        roomId: room,
      },
      (r) => {
        if (r.error) return console.log(r.m); // if an error is returned in the response set roomError to the error message and exit
        dispatch(addMessage(r));
      }
    );

    dispatch(setInput(''));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClickSend();
    }
  };

  return (
    <>
      <Box className="absolute bottom-0 left-0 p-5 w-full flex align-center">
        <MessageInput handleKeyPress={handleKeyPress} />
        <SendMessageButton onClickSend={onClickSend} />
      </Box>
    </>
  );
};

const SendMessageButton = ({ onClickSend }) => {
  return (
    <Button onClick={onClickSend} variant="contained">
      Send
    </Button>
  );
};

export default Form;
