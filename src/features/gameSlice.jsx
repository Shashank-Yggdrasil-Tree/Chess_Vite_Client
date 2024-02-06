import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: "", // it's just the room ID.
  orientation: "",
  players: [], //has objects with player_id and username
  username: "",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.room = action.payload;
    },
    setOrientation: (state, action) => {
      state.orientation = action.payload;
    },
    setPlayers: (state, action) => {
      state.players = [...action.payload];
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRoom, setOrientation, setPlayers, setUsername } =
  gameSlice.actions;

export default gameSlice.reducer;
