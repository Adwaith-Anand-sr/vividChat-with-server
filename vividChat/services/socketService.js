import { io } from 'socket.io-client';

const socket = io('wss://vividchatserver.onrender.com', { reconnection: true });
//wss://vividchatserver.onrender.com
//ws://localhost:3000
export default socket;