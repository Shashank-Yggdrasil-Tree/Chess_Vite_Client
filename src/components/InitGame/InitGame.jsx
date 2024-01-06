import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import CustomDialog from "../CustomDialog/CustomDialog";
import socket from "../../socket";
import { useSelector, useDispatch } from "react-redux";
import {
  setRoom,
  setOrientation,
  setPlayers,
} from "../../features/gameSlice/gameSlice";

function InitGame() {
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [roomInput, setRoomInput] = useState("");
  const [roomError, setRoomError] = useState("");

  const dispatch = useDispatch();

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      className="h-full"
      sx={{ py: 1 }}
    >
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
      <Button
        variant="contained"
        onClick={() => {
          socket.emit("createRoom", (r) => {
            console.log(r);
            dispatch(setRoom(r));
            dispatch(setOrientation("white"));
          });
        }}
      >
        Start a game
      </Button>
      {/* Button for joining a game */}
      <Button onClick={() => setRoomDialogOpen(true)}>Join a game</Button>
    </Stack>
  );
}

export default InitGame;
