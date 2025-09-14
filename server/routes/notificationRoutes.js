import express from "express";
import { getNotifications, markAsRead, deleteNotification } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/:userId", getNotifications);
router.put("/:id/read", markAsRead);
// ✅ Add the new DELETE route for deleting a notification
router.delete("/:id", deleteNotification);

export default router;