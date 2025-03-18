"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const activity_socket_1 = __importDefault(require("../modules/activity/activity.socket"));
const setupSocket = (io) => {
    console.log("Setting up WebSockets...");
    (0, activity_socket_1.default)(io);
};
exports.default = setupSocket;
