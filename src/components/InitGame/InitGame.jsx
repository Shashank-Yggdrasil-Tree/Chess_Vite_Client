import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import CustomDialog from "../CustomDialog/CustomDialog";
import socket from "../../socket";
import { useSelector, useDispatch } from "react-redux";
import {
  setRoom,
  setOrientation,
  setPlayers,
} from "../../features/gameSlice/gameSlice";
import CustomButton from "../CustomButton/CustomButton";
import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import { setIsLoggedIn } from "../../features/loginSlice/loginSlice.jsx";

function InitGame() {
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [roomInput, setRoomInput] = useState("");
  const [roomError, setRoomError] = useState("");

  const dispatch = useDispatch();

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      className="h-full relative"
      sx={{ py: 1 }}
    >
      <TooltipWrapper helpText="Logout" placement="right">
        <img
          className="absolute top-0 left-0 w-8 m-2 cursor-pointer transition ease-in-out hover:scale-110 duration-150"
          src="/svg_icons/logout.svg"
          alt="Logout"
          onClick={() => {
            socket.emit("logout");
            dispatch(setIsLoggedIn(false));
          }}
        />
      </TooltipWrapper>
      <CustomDialog
        open={roomDialogOpen}
        handleClose={() => setRoomDialogOpen(false)}
        title="Select Room to Join"
        contentText="Enter a valid room ID to join the room"
        handleContinue={() => {
          // Join a room
          if (!roomInput) return; // if given room input is valid, do nothing.
          socket.emit("joinRoom", { roomId: roomInput }, (r) => {
            // r is the response from the server
            if (r.error) return setRoomError(r.message); // if an error is returned in the response set roomError to the error message and exit
            console.log("response:", r);
            console.log("setRoom:", r?.roomId);
            console.log("setPlayers:", r?.players);
            dispatch(setRoom(r?.roomId));
            dispatch(setPlayers(r?.players));
            dispatch(setOrientation("black"));
            // setRoom(r?.roomId); // set room to the room ID
            // setPlayers(r?.players); // set players array to the array of players in the room
            // setOrientation("black"); // set orientation as black
            setRoomDialogOpen(false); // close dialog
          });
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          id="room"
          label="Room ID"
          name="room"
          value={roomInput}
          required
          onChange={(e) => setRoomInput(e.target.value)}
          type="text"
          fullWidth
          variant="standard"
          error={Boolean(roomError)}
          helperText={
            !roomError ? "Enter a room ID" : `Invalid room ID: ${roomError}`
          }
        />
      </CustomDialog>
      {/* Button for starting a game */}
      <CustomButton
        handleClick={() => {
          socket.emit("createRoom", (r) => {
            console.log(r);
            dispatch(setRoom(r));
            dispatch(setOrientation("white"));
          });
        }}
      >
        Start a game
      </CustomButton>
      {/* Button for joining a game */}
      <a
        onClick={() => setRoomDialogOpen(true)}
        className="text-lg p-1 cursor-pointer font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-600 inline-block text-transparent bg-clip-text hover:text-white transition ease-in-out hover:scale-110 duration-150"
      >
        JOIN A GAME
      </a>
    </Stack>
  );
}

export default InitGame;
