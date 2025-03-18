"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addActivity = exports.getAllActivities = void 0;
const database_1 = __importDefault(require("../../config/database"));
// Fetch all activities
const getAllActivities = () => {
    return new Promise((resolve, reject) => {
        database_1.default.all("SELECT * FROM activity ORDER BY timestamp DESC", [], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
};
exports.getAllActivities = getAllActivities;
// Add a new activity
const addActivity = (activity, io) => {
    return new Promise((resolve, reject) => {
        database_1.default.run("INSERT INTO activity (userId, type, timestamp, description) VALUES (?, ?, ?, ?)", [activity.userId, activity.type, activity.timestamp, activity.description], function (err) {
            if (err)
                reject(err);
            else {
                const newActivity = Object.assign(Object.assign({}, activity), { id: this.lastID.toString() });
                io.of("/activity").emit("activityUpdate", newActivity);
                resolve(newActivity);
            }
        });
    });
};
exports.addActivity = addActivity;
