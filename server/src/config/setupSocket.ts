import { Server } from "socket.io";
import activitySocket from "../modules/activity/activity.socket";

const setupSocket = (io: Server) => {
  console.log("Setting up WebSockets...");
  activitySocket(io);
};

export default setupSocket;
