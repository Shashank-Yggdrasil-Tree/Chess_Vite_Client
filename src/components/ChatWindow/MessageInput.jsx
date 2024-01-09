import { TextField } from '@mui/material';
import React from 'react';
import { setInput } from '../../features/chatSlice/chatSlice';
import { useDispatch, useSelector } from 'react-redux';

const MessageInput = ({ handleKeyPress }) => {
  const input = useSelector((state) => state.chat.input);

  const dispatch = useDispatch();

  const handleInput = (e) => {
    dispatch(setInput(e.target.value));
  };

  return (
    <>
      <TextField
        className="w-full p-2"
        id="message"
        type="text"
        onChange={handleInput}
        onKeyDown={handleKeyPress}
        value={input}
      ></TextField>
    </>
  );
};

export default MessageInput;
