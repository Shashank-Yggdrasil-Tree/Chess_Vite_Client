import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../features/gameSlice/gameSlice";
import loginReducer from "../features/loginSlice/loginSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    login: loginReducer,
  },
});
