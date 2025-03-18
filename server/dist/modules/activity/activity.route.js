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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activity_controller_1 = __importDefault(require("./activity.controller"));
const router = express_1.default.Router();
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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield activity_controller_1.default.fetchActivities(req, res);
}));
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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const io = req.app.get("io");
    yield activity_controller_1.default.createActivity(req, res, io);
}));
exports.default = router;
