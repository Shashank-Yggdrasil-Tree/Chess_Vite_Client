import React, { useCallback, useEffect, useState } from "react";
import CommonBoxWrapper from "../CommonBoxWrapper/CommonBoxWrapper";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket";
import { addMessage } from "../../features/chatSlice/chatSlice";

const ChatWindow = () => {
  const username = useSelector((state) => state.game.username);
  const room = useSelector((state) => state.game.room);
  const message = useSelector((state) => state.chat.message);
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const onClickSend = () => {
    // setMessageText(input);
    console.log("sending a message", input, room);
    console.log("check if message is updated?", message);

    socket.emit(
      "message",
      {
        username: username,
        messageText: input,
        roomId: room,
      },
      (r) => {
        if (r.error) return console.log(r.m); // if an error is returned in the response set roomError to the error message and exit
        console.log("response from message socket", r);
        dispatch(addMessage(r));
      }
    );

    // dispatch(); //message details
    setInput("");
  };

  useEffect(() => {
    console.log(message);

    socket.on("messageRecieved", (message) => {
      console.log("key ye bahisaab chalte bhi hai?");
      dispatch(addMessage(message)); //
    });
  }, [dispatch]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onClickSend();
    }
  };

  return (
    <CommonBoxWrapper
      additional_class="relative h-full"
      // border_color="border-0 hover:bg-green-500"
    >
      {message.map(({ id, text, username }) => (
        <p key={id} className="text-white">
          {username}:{text}
        </p>
      ))}
      {/* {status} */}
      <Box className="absolute bottom-0 left-0 p-10 w-full bg-pink-400">
        {username}
        <TextField
          id="time"
          type="text"
          onInput={handleInput}
          onKeyDown={handleKeyPress}
          value={input}
        ></TextField>
        <Button onClick={onClickSend}>Send</Button>
      </Box>
    </CommonBoxWrapper>
  );
};

export default ChatWindow;
