"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const activity_route_1 = __importDefault(require("./modules/activity/activity.route"));
const setupSocket_1 = __importDefault(require("./config/setupSocket"));
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: "*" },
});
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Swagger Docs
(0, swagger_1.setupSwagger)(app);
// API Routes
app.use("/api/activity", activity_route_1.default);
// WebSocket Setup
(0, setupSocket_1.default)(io);
app.set("io", io);
// Start Server
const PORT = process.env.PORT || 9004;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
