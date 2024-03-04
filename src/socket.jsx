import { io } from 'socket.io-client';

// const socket = io('https://chess-server.adaptable.app/api'); // initialize websocket connection
const socket = io('192.168.253.140:4242'); // initialize wsebsocket connection

export default socket;
