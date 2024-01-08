import { Box, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import CommonBox from "../CommonBox/CommonBox";
import socket from "../../socket.jsx";
import InitGame from "../InitGame/InitGame.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  setPlayers,
  setUsername,
} from "../../features/gameSlice/gameSlice.jsx";
import { setIsLoggedIn } from "../../features/loginSlice/loginSlice.jsx";
import CommonBoxWrapper from "../CommonBoxWrapper/CommonBoxWrapper";

const Login = () => {
  const [enterUsername, setEnterUsername] = useState(false);
  const username = useSelector((state) => state.game.username);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("opponentJoined", (roomData) => {
      console.log("roomData", roomData);
      dispatch(setPlayers(roomData.players));
    });
  }, []);

  return (
    <CommonBoxWrapper
      additional_class="h-48 relative"
      border_color="border-2 border-zinc-800 hover:border-violet-800"
    >
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
                dispatch(setIsLoggedIn(true));
              }}
            >
              <TextField
                InputProps={{
                  style: {
                    backgroundColor: "transparent",
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
                margin="dense"
                id="username"
                label="Username"
                color="secondary"
                variant="outlined"
                name="username"
                value={username}
                required
                onKeyDown={() => setEnterUsername(true)}
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
        </Box>
      )}
    </CommonBoxWrapper>
  );
};

export default Login;
