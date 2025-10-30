import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { healthMessages } from "../utils/healthMessages.js";
import { 
  getNotifications, 
  markAsRead, 
  deleteNotification, 
  markAllAsRead,
  deleteAll, 
  deleteRead, 
  deleteUnread 
} from "../controllers/notificationController.js"; 

const router = express.Router();

// ===== User-specific notification routes =====
router.get("/", protect, getNotifications);

// Read/Mark routes
router.put("/:id/read", protect, markAsRead);
router.put("/read-all", protect, markAllAsRead); 

// ------------------------------------------------------------------
// ✅ FIX: Place specific routes (bulk operations) BEFORE dynamic routes
// ------------------------------------------------------------------

// BULK Delete Routes (Specific)
router.delete("/all", protect, deleteAll);       // Matches /notifications/all
router.delete("/read", protect, deleteRead);     // Matches /notifications/read
router.delete("/unread", protect, deleteUnread); // Matches /notifications/unread

// SINGLE Delete Route (Dynamic)
router.delete("/:id", protect, deleteNotification); // Matches /notifications/60d...

// ===== Random health notification route (kept for completeness) =====
router.post("/sendRandom", async (req, res) => {
  try {
    const randomMessage = healthMessages[Math.floor(Math.random() * healthMessages.length)];
    const users = await User.find({});
    const notifications = [];

    for (const user of users) {
      const notification = new Notification({ userId: user._id, message: randomMessage });
      await notification.save();
      notifications.push(notification);
    }

    res.json({ success: true, message: "Random notifications sent", notifications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;