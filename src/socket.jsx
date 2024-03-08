import { io } from 'socket.io-client';
import { BASE_URL } from './constants/constants';

const socket = io(BASE_URL); // initialize wsebsocket connection

export default socket;
