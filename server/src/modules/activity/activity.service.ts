import db from "../../config/database";
import { ActivityLog } from "./activity.model";
import { Server } from "socket.io";

// Fetch all activities
export const getAllActivities = (): Promise<ActivityLog[]> => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM activity ORDER BY timestamp DESC", [], (err: Error, rows: ActivityLog[]) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Add a new activity
export const addActivity = (activity: ActivityLog, io: Server): Promise<ActivityLog> => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO activity (userId, type, timestamp, description) VALUES (?, ?, ?, ?)",
      [activity.userId, activity.type, activity.timestamp, activity.description],
      function (this: any, err: Error | null) {
        if (err) reject(err);
        else {
          const newActivity: ActivityLog = { 
            ...activity, 
            id: this.lastID.toString()
          };
          io.of("/activity").emit("activityUpdate", newActivity);
          resolve(newActivity);
        }
      },
    );
  });
};
