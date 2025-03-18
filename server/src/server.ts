import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import activityRoutes from "./modules/activity/activity.route";
import setupSocket from "./config/setupSocket";
import { setupSwagger } from "./config/swagger";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(express.json());
app.use(cors());

// Swagger Docs
setupSwagger(app);

// API Routes
app.use("/api/activity", activityRoutes);

// WebSocket Setup
setupSocket(io);
app.set("io", io);



// Start Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
