import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { healthMessages } from "../utils/healthMessages.js";
import { getNotifications, markAsRead, deleteNotification } from "../controllers/notificationController.js";

const router = express.Router();

// ===== User-specific notification routes =====
router.get("/", protect, getNotifications);
router.put("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteNotification);

// ===== Random health notification route =====
// This is called by cron-job.org or manually for testing
router.post("/sendRandom", async (req, res) => {
  try {
    const randomMessage = healthMessages[Math.floor(Math.random() * healthMessages.length)];
    const users = await User.find({});
    const notifications = [];

    for (const user of users) {
      const notification = new Notification({ userId: user._id, message: randomMessage });
      await notification.save();

      // If you want real-time push with socket.io, you'll need io instance
      // Example: io.to(user._id.toString()).emit("newNotification", notification);

      notifications.push(notification);
    }

    res.json({ success: true, message: "Random notifications sent", notifications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
