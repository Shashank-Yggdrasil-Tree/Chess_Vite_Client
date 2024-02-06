import { TextField } from '@mui/material';
import React from 'react';

const MessageInput = ({ register }) => {
  return (
    <div className="w-full p-2">
      <TextField
        id="message"
        type="text"
        autoComplete="off"
        placeholder="Type a message"
        className="w-full  caret-pink-500"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'gray', // Default outline color
            },
            '&:hover fieldset': {
              borderColor: 'white', // Outline color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', // Outline color on focus
            },
          },
          input: { color: 'white' },
        }}
        {...register('message', {
          required: { value: true, message: 'cannot send an empty message' },
        })}
      ></TextField>
      {/* <p className="text-red font-[12px]">{errors.message?.message}</p> */}
    </div>
  );
};

export default MessageInput;
