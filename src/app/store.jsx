import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../features/gameSlice/gameSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});
