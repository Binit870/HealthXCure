import Notification from "../models/Notification.js";


export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
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

    // Authorization check: ensure the notification belongs to the authenticated user
    if (notification.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to perform this action" });
    }

    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (err) {
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

    // Authorization check: ensure the notification belongs to the authenticated user
    if (notification.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to perform this action" });
    }

    await notification.deleteOne();
    res.json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};