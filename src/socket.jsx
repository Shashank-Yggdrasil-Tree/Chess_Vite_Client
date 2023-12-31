import { io } from "socket.io-client";

const socket = io("https://chess-server.adaptable.app/api"); // initialize websocket connection

export default socket;
