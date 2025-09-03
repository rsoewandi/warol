import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

let socket;

export function initSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"], 
    });
  }
  return socket;
}

export function getSocket() {
  return socket;
}
