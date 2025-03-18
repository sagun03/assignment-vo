import express from "express";
import ActivityController from "./activity.controller";
import { Server } from "socket.io";

const router = express.Router();

/**
 * @swagger
 * /api/activity:
 *   get:
 *     summary: Retrieve all activities
 *     tags:
 *       - Activities
 *     responses:
 *       200:
 *         description: A list of activities
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  await ActivityController.fetchActivities(req, res);
});

/**
 * @swagger
 * /api/activity:
 *   post:
 *     summary: Create a new activity
 *     tags:
 *       - Activities
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum:
 *                   - pageView
 *                   - click
 *                   - formSubmission
 *                   - error
 *                   - apiCall
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Activity created
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
  const io = req.app.get("io") as Server;
  await ActivityController.createActivity(req, res, io);
});

export default router;
