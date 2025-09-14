import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import API, { SOCKET_URL } from "../utils/Api";
import { FaBell, FaCheck, FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../context/AuthContext';

const Notification = () => {
  const { user, loading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (loading || !user) return;

    const userId = user._id;

    socketRef.current = io(SOCKET_URL, { withCredentials: true });

    socketRef.current.emit("join", userId);

    const fetchNotifications = async () => {
      try {
        const res = await API.get(`/notifications/${userId}`);
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err.message);
      }
    };
    fetchNotifications();

    socketRef.current.on("newNotification", (notif) => {
      if (notif.userId?.toString() === userId.toString()) {
        setNotifications((prev) => [notif, ...prev]);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("newNotification");
        socketRef.current.disconnect();
      }
    };
  }, [user, loading]);

  const markRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Error marking as read:", err.message);
    }
  };

  const deleteNotif = async (id) => {
    try {
      await API.delete(`/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting notification:", err.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-slate-950 min-h-screen py-20 font-sans text-gray-100 animate-gradient">
      <div className="p-12 bg-gray-800 rounded-3xl shadow-2xl max-w-2xl mx-auto border border-gray-700">

        {/* Header with improved motion and glow */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10 pb-4 border-b border-gray-700"
        >
          <h2 className="flex items-center gap-4 text-4xl font-extrabold text-white">
            <FaBell className="text-blue-400 animate-pulse-slow drop-shadow-lg" /> Notifications
          </h2>
          {notifications.length > 0 && (
            <motion.span
              key={notifications.filter(n => !n.isRead).length}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="text-base font-semibold bg-blue-500 text-white px-4 py-1.5 rounded-full shadow-lg"
            >
              {notifications.filter(n => !n.isRead).length} Unread
            </motion.span>
          )}
        </motion.div>

        {/* Notifications List with Staggering Animation */}
        {notifications.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-lg text-center py-12 font-medium"
          >
            You're all caught up! ✨
          </motion.p>
        ) : (
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="space-y-5"
          >
            <AnimatePresence>
              {notifications.map((n) => (
                <motion.li
                  key={n._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
                    transition: { duration: 0.2 },
                  }}
                  className={`p-6 rounded-2xl flex items-start gap-5 transition-all duration-300 transform cursor-pointer ${n.isRead
                      ? "bg-gray-800 border border-gray-700 text-gray-400"
                      : "bg-gray-700 border-blue-500 shadow-xl"
                    }`}
                >
                  {/* Message and Timestamp Container */}
                  <div className="flex-grow">
                    <p className="font-semibold text-xl leading-relaxed text-gray-200 group-hover:text-white transition-colors duration-200">
                      {n.message}
                    </p>
                    <span className="text-xs text-gray-500 mt-2 block font-mono">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-3">
                    {!n.isRead && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => markRead(n._id)}
                        className="p-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md"
                        title="Mark as Read"
                      >
                        <FaCheck size={16} />
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteNotif(n._id)}
                      className="p-3 rounded-full bg-red-800 text-red-300 hover:bg-red-700 transition-colors duration-200"
                      title="Delete"
                    >
                      <FaTrashAlt size={16} />
                    </motion.button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
};

export default Notification;