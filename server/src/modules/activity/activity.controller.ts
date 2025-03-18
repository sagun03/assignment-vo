import { Request, Response } from "express";
import { getAllActivities, addActivity } from "./activity.service";
import { ActivityLog } from "./activity.model";
import { Server } from "socket.io";

class ActivityController {
  static instance: ActivityController;

  private constructor() {}

  static getInstance() {
    if (!ActivityController.instance) {
      ActivityController.instance = new ActivityController();
    }
    return ActivityController.instance;
  }

  // Fetch all activities
  fetchActivities = async (req: Request, res: Response): Promise<Response> => {
    try {
      const activities = await getAllActivities();
      return res.json(activities);
    } catch (error) {
      return res.status(500).json({ error: (error as any).message });
    }
  };

  // Create a new activity
  createActivity = async (req: Request, res: Response, io: Server): Promise<Response>  => {
    const { userId, type, description } = req.body;

    // Validate incoming data
    if (!userId || !type || !description) {
      return res.status(400).json({ error: "Missing userId, type, or description" });
    }

    const timestamp = new Date().toISOString();

    try {
      const newActivity: ActivityLog = { userId, type, description, timestamp, id: "" }; // Initialize ID as empty string
      const addedActivity = await addActivity(newActivity, io);
      return res.status(201).json(addedActivity);
    } catch (error) {
      return res.status(500).json({ error: (error as any).message });
    }
  };
}

export default ActivityController.getInstance();
