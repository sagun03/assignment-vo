"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const activity_service_1 = require("./activity.service");
// This function initializes the socket.io activity namespace
const activitySocket = (io) => {
    const activityNamespace = io.of("/activity");
    activityNamespace.on("connection", (socket) => {
        console.log("Activity module: New client connected");
        // Listen to new activity creation from socket
        socket.on("newActivity", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { userId, type, description } = data;
            const timestamp = new Date().toISOString();
            // Ensure data matches the ActivityLog structure
            const newActivity = { userId, type, description, timestamp, id: "" };
            try {
                // Add activity to DB and emit the event to the clients
                yield (0, activity_service_1.addActivity)(newActivity, io);
            }
            catch (error) {
                console.error("Activity insert error:", error);
            }
        }));
        socket.on("disconnect", () => {
            console.log("Activity module: Client disconnected");
        });
    });
};
exports.default = activitySocket;
