import Notification from "../models/Notification.js";

// --- CRUD Operations ---

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    // FIX: Added logging here to help diagnose the 500 error if it's not a missing req.user
    console.error("Error in getNotifications:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to perform this action" });
    }

    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (err) {
    console.error("Error in markAsRead:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { userId: req.user._id, isRead: false },
      { $set: { isRead: true } }
    );
    res.json({ message: "All notifications marked as read", updatedCount: result.modifiedCount });
  } catch (err) {
    console.error("Error in markAllAsRead:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to perform this action" });
    }

    await notification.deleteOne();
    res.json({ message: "Notification deleted successfully" });
  } catch (err) {
    console.error("Error in deleteNotification:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// --- New Bulk Delete Functions ---

// 1. Delete ALL notifications for the user
export const deleteAll = async (req, res) => {
  try {
    const result = await Notification.deleteMany({ userId: req.user._id });
    res.json({ message: "All notifications deleted", deletedCount: result.deletedCount });
  } catch (err) {
    // FIX: Added logging to debug the 500 error
    console.error("Error in deleteAll:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 2. Delete only READ notifications for the user
export const deleteRead = async (req, res) => {
  try {
    const result = await Notification.deleteMany({ userId: req.user._id, isRead: true });
    res.json({ message: "Read notifications deleted", deletedCount: result.deletedCount });
  } catch (err) {
    // FIX: Added logging to debug the 500 error
    console.error("Error in deleteRead:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 3. Delete only UNREAD notifications for the user
export const deleteUnread = async (req, res) => {
  try {
    const result = await Notification.deleteMany({ userId: req.user._id, isRead: false });
    res.json({ message: "Unread notifications deleted", deletedCount: result.deletedCount });
  } catch (err) {
    // FIX: Added logging to debug the 500 error
    console.error("Error in deleteUnread:", err.message);
    res.status(500).json({ error: err.message });
  }
};