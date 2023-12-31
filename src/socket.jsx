import { io } from "socket.io-client";

const socket = io("https://chess-server-six.vercel.app/"); // initialize websocket connection

export default socket;
