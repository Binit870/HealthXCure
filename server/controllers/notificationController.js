import Notification from "../models/Notification.js";

// Get all notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notif = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    res.json(notif);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Notification.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};