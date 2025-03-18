import { Socket, Server } from "socket.io";
import { addActivity } from "./activity.service";
import { ActivityLog } from "./activity.model";

// This function initializes the socket.io activity namespace
const activitySocket = (io: Server) => {
  const activityNamespace = io.of("/activity");

  activityNamespace.on("connection", (socket: Socket) => {
    console.log("Activity module: New client connected");

    // Listen to new activity creation from socket
    socket.on("newActivity", async (data) => {
      const { userId, type, description } = data;
      const timestamp = new Date().toISOString();

      // Ensure data matches the ActivityLog structure
      const newActivity: ActivityLog = { userId, type, description, timestamp, id: "" };

      try {
        // Add activity to DB and emit the event to the clients
        await addActivity(newActivity, io);
      } catch (error) {
        console.error("Activity insert error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Activity module: Client disconnected");
    });
  });
};

export default activitySocket;
