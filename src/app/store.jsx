import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../features/gameSlice/gameSlice";
import loginReducer from "../features/loginSlice/loginSlice";
import chatReducer from "../features/chatSlice/chatSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    login: loginReducer,
    chat: chatReducer,
  },
});
