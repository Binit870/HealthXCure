import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import API, { SOCKET_URL } from "../utils/Api";
import toast from "react-hot-toast";
import {
  FaBell,
  FaCheck,
  FaTrashAlt,
  FaGhost,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import moment from "moment";

// Constants
const FILTER_ALL = "all";
const FILTER_UNREAD = "unread";
const FILTER_READ = "read";

const Notification = () => {
  const { user, loading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState(FILTER_ALL);
  const socketRef = useRef(null);

  useEffect(() => {
    if (loading || !user) return;

    socketRef.current = io(SOCKET_URL, { withCredentials: true });
    socketRef.current.emit("join", user._id);

    const fetchNotifications = async () => {
      try {
        const res = await API.get(`/notifications`);
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        toast.error("Error fetching notifications.");
      }
    };

    fetchNotifications();

    socketRef.current.on("newNotification", (notif) => {
      if (notif.userId?.toString() === user._id.toString()) {
        setNotifications((prev) => [notif, ...prev]);
      }
    });

    return () => {
      socketRef.current?.off("newNotification");
      socketRef.current?.disconnect();
    };
  }, [user, loading]);

  // --- Notification Handlers ---
  const markRead = async (id) => {
    try {
      const res = await API.put(`/notifications/${id}/read`).catch(() => null);
      if (!res || res.status >= 400) throw new Error();
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      toast.success("Marked as read!");
    } catch {
      toast.error("Failed to mark notification as read.");
    }
  };

  const markAllRead = async () => {
    try {
      const res = await API.put(`/notifications/read-all`).catch(() => null);
      if (!res || res.status >= 400) throw new Error();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success("All notifications marked as read!");
    } catch {
      toast.error("Failed to mark all as read.");
    }
  };

  const deleteNotif = async (id) => {
    try {
      const res = await API.delete(`/notifications/${id}`).catch(() => null);
      if (!res || res.status >= 400) throw new Error();
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      toast.success("Notification deleted!");
    } catch {
      toast.error("Failed to delete notification.");
    }
  };

  const deleteAllNotifications = async () => {
    try {
      const res = await API.delete(`/notifications/all`).catch(() => null);
      if (!res || res.status >= 400) throw new Error();
      setNotifications([]);
      toast.success("All notifications deleted!");
    } catch {
      toast.error("Failed to delete all notifications.");
    }
  };

  const deleteReadNotifications = async () => {
    try {
      const res = await API.delete(`/notifications/read`).catch(() => null);
      if (!res || res.status >= 400) throw new Error();
      setNotifications((prev) => prev.filter((n) => !n.isRead));
      toast.success("All read notifications deleted!");
    } catch {
      toast.error("Failed to delete read notifications.");
    }
  };

  const deleteUnreadNotifications = async () => {
    try {
      const res = await API.delete(`/notifications/unread`).catch(() => null);
      if (!res || res.status >= 400) throw new Error();
      setNotifications((prev) => prev.filter((n) => n.isRead));
      toast.success("All unread notifications deleted!");
    } catch {
      toast.error("Failed to delete unread notifications.");
    }
  };

  const handleDeleteAll = () => {
    switch (filter) {
      case FILTER_ALL:
        return deleteAllNotifications();
      case FILTER_READ:
        return deleteReadNotifications();
      case FILTER_UNREAD:
        return deleteUnreadNotifications();
      default:
        return;
    }
  };

  // --- Derived values ---
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const readCount = notifications.length - unreadCount;
  const filteredNotifications = notifications.filter((n) => {
    if (filter === FILTER_UNREAD) return !n.isRead;
    if (filter === FILTER_READ) return n.isRead;
    return true;
  });
  const currentCount = filteredNotifications.length;

  const getButtonClass = (buttonFilter) =>
    `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
      filter === buttonFilter
        ? "bg-cyan-500 text-white shadow-md"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`;

  // --- JSX ---
  return (
    <div
      className="min-h-screen py-10 flex justify-center"
      style={{
        background: "linear-gradient(180deg, #e6fffa 0%, #ccfbf1 100%)",
      }}
    >
      <div className="w-full max-w-4xl p-6 bg-white shadow-xl rounded-xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
            <FaBell className="text-cyan-500 text-3xl" />
            Notifications
          </h2>
          <div className="text-sm text-gray-500">
            Calm & focused — Patient safety first
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter(FILTER_ALL)}
              className={getButtonClass(FILTER_ALL)}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter(FILTER_UNREAD)}
              className={getButtonClass(FILTER_UNREAD)}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter(FILTER_READ)}
              className={getButtonClass(FILTER_READ)}
            >
              Read ({readCount})
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {filter === FILTER_UNREAD && unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full bg-green-500 text-white hover:bg-green-600 shadow-md"
              >
                <FaEnvelopeOpenText size={14} /> Read All
              </button>
            )}

            {currentCount > 0 && (
              <button
                onClick={handleDeleteAll}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md"
              >
                <FaTrashAlt size={14} /> Delete All
              </button>
            )}
          </div>
        </div>

        {/* Notification List */}
        {filteredNotifications.length === 0 ? (
          <div className="text-gray-500 text-center py-12 flex flex-col items-center gap-4">
            <FaGhost className="text-gray-300 text-5xl mb-3" />
            <p className="text-lg font-medium">
              {filter === FILTER_ALL && "You're all caught up! No notifications. 🎉"}
              {filter === FILTER_UNREAD &&
                "No unread notifications here! Take a deep breath. 🧘‍♀️"}
              {filter === FILTER_READ && "No read notifications found. All clear. ✓"}
            </p>
            <p className="text-sm text-gray-400">Calm workspace.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredNotifications.map((n) => (
              <li
                key={n._id}
                className={`p-4 rounded-lg flex items-start gap-4 transition-colors duration-200 ${
                  n.isRead
                    ? "bg-white border border-gray-200 text-gray-600 hover:shadow-md"
                    : "bg-cyan-50 border border-cyan-200 text-gray-800 font-semibold shadow-sm hover:shadow-lg"
                }`}
              >
                <div className="flex-grow">
                  <p
                    className={`text-base ${
                      n.isRead ? "text-gray-600" : "text-gray-900 font-semibold"
                    }`}
                  >
                    {n.message}
                  </p>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {moment(n.createdAt).fromNow()}
                  </span>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2">
                  {!n.isRead && (
                    <button
                      onClick={() => markRead(n._id)}
                      className="p-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 shadow-md"
                      title="Mark as Read"
                    >
                      <FaCheck size={14} />
                    </button>
                  )}

                  <button
                    onClick={() => deleteNotif(n._id)}
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                    title="Delete"
                  >
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notification;
