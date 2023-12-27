import { Box, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import CommonBox from "../CommonBox/CommonBox";
import socket from "../../socket.jsx";
import InitGame from "../InitGame/InitGame.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  setRoom,
  setOrientation,
  setPlayers,
  setUsername,
} from "../../features/gameSlice/gameSlice.jsx";

const Login = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [enterUsername, setEnterUsername] = useState(false);
  // const [username, setUsername] = useState("");
  // const [usernameSubmitted, setUsernameSubmitted] = useState(false);

  // const room = useSelector((state) => state.game.room);
  // const orientation = useSelector((state) => state.game.orientation);
  // const players = useSelector((state) => state.game.players);
  const username = useSelector((state) => state.game.username);
  const dispatch = useDispatch();

  const cleanup = useCallback(() => {
    dispatch(setRoom(""));
    dispatch(setOrientation(""));
    dispatch(setPlayers([]));
  }, []);

  useEffect(() => {
    // const username = prompt("Username");
    // setUsername(username);
    // socket.emit("username", username);

    socket.on("opponentJoined", (roomData) => {
      console.log("roomData", roomData);
      dispatch(setPlayers(roomData.players));
    });
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  //   {room ? (
  //     <Game
  //       room={room}
  //       orientation={orientation}
  //       username={username}
  //       players={players}
  //       cleanup={cleanup}
  //     />
  //   ) : (
  //     <InitGame
  //       setRoom={setRoom}
  //       setOrientation={setOrientation}
  //       setPlayers={setPlayers}
  //     />
  //   )}

  return (
    <>
      {isLoggedIn ? (
        <InitGame />
      ) : (
        <Box className={"h-48 relative"}>
          {enterUsername ? (
            <CommonBox
              visible={enterUsername}
              handleHideBox={() => setEnterUsername(false)}
              title="Pick a username"
              handleContinue={() => {
                if (!username) return;
                socket.emit("username", username);
                setIsLoggedIn(true);
              }}
            >
              <TextField
                InputProps={{
                  style: {
                    backgroundColor: "transparent",
                    border: isFocused ? "none" : "solid 1px white",
                    caretColor: "white",
                    color: "white",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                autoFocus
                onFocus={handleFocus}
                onBlur={handleBlur}
                margin="dense"
                id="username"
                label="Username"
                color="secondary"
                variant="outlined"
                name="username"
                value={username}
                required
                onChange={(e) => dispatch(setUsername(e.target.value))} // update username state with value
                type="text"
                fullWidth
              />
            </CommonBox>
          ) : (
            <Box className="inset-center">
              <CustomButton handleClick={() => setEnterUsername(true)}>
                Login
              </CustomButton>
            </Box>
          )}

          {/* visible,
          children,
          handleHideBox,
          title,
          contentText,
          handleContinue,
          boxHeight = "h-32", */}
        </Box>
      )}
    </>
  );
};

export default Login;
