import React, { useCallback, useEffect, useState } from "react";
import CommonBoxWrapper from "../../common/CommonBoxWrapper/CommonBoxWrapper";
import { Box, Button, Divider, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket";
import { addMessage } from "../../features/chatSlice/chatSlice";

const ChatWindow = () => {
  const senderUsername = useSelector((state) => state.game.username);
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
        username: senderUsername,
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
    const handleReceivedMessage = (message) => {
      dispatch(addMessage(message));
    };

    socket.on("messageRecieved", handleReceivedMessage);

    return () => {
      // Unsubscribe from the event when the component unmounts
      socket.off("messageRecieved", handleReceivedMessage);
    };
  }, [dispatch]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onClickSend();
    }
  };

  return (
    <CommonBoxWrapper additional_class="relative h-full bg-[#092635] p-5">
      <Box className="bg-[#1B4242] h-full">
        {message &&
          message.map(({ id, text, username }) => (
            <div
              key={id}
              className={
                username === senderUsername ? "text-white" : "text-black"
              }
            >
              <h1>{username}</h1>
              <hr />
              <p>{text}</p>
            </div>
          ))}
        {/* {status} */}
        <Box className="absolute bottom-0 left-0 p-5 w-full flex align-center">
          <TextField
            className="w-full p-2"
            id="time"
            type="text"
            onInput={handleInput}
            onKeyDown={handleKeyPress}
            value={input}
          ></TextField>
          <Button onClick={onClickSend} variant="contained">
            Send
          </Button>
        </Box>
      </Box>
    </CommonBoxWrapper>
  );
};

export default ChatWindow;
