import { io } from "socket.io-client";

const socket = io("192.168.214.140:8080"); // initialize websocket connection

export default socket;
