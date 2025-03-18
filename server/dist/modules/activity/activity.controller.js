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
class ActivityController {
    constructor() {
        // Fetch all activities
        this.fetchActivities = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const activities = yield (0, activity_service_1.getAllActivities)();
                return res.json(activities);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
        // Create a new activity
        this.createActivity = (req, res, io) => __awaiter(this, void 0, void 0, function* () {
            const { userId, type, description } = req.body;
            // Validate incoming data
            if (!userId || !type || !description) {
                return res.status(400).json({ error: "Missing userId, type, or description" });
            }
            const timestamp = new Date().toISOString();
            try {
                const newActivity = { userId, type, description, timestamp, id: "" }; // Initialize ID as empty string
                const addedActivity = yield (0, activity_service_1.addActivity)(newActivity, io);
                return res.status(201).json(addedActivity);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    static getInstance() {
        if (!ActivityController.instance) {
            ActivityController.instance = new ActivityController();
        }
        return ActivityController.instance;
    }
}
exports.default = ActivityController.getInstance();
