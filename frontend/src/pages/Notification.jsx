import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import API, { SOCKET_URL } from "../utils/Api";
import { FaBell, FaCheck, FaTrashAlt, FaGhost } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../context/AuthContext';
import moment from 'moment';

const Notification = () => {
  const { user, loading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (loading || !user) return;

    const userId = user._id;

    socketRef.current = io(SOCKET_URL, {
      withCredentials: true,
    });

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
    <div className="relative overflow-hidden min-h-screen py-20 font-sans text-gray-100 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob-1 animation-delay-0"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob-2 animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob-3 animation-delay-4000"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        // This is the line that was changed: max-w-2xl -> max-w-4xl
        className="relative z-10 p-12 bg-gray-900 rounded-3xl shadow-2xl max-w-8xl mx-auto border border-gray-700 backdrop-blur-md bg-opacity-80"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-between mb-10 pb-4 border-b border-gray-700"
        >
          <h2 className="flex items-center gap-4 text-4xl font-extrabold text-white">
            <FaBell className="text-blue-400 animate-pulse-slow drop-shadow-lg text-5xl" /> Notifications
          </h2>
          {notifications.length > 0 && (
            <motion.span
              key={notifications.filter(n => !n.isRead).length}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="text-base font-semibold bg-blue-600 text-white px-4 py-1.5 rounded-full shadow-lg pulse-shadow"
            >
              {notifications.filter(n => !n.isRead).length} Unread
            </motion.span>
          )}
        </motion.div>

        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-600 text-lg text-center py-12 font-medium flex flex-col items-center gap-4"
          >
            <FaGhost className="text-gray-700 text-6xl mb-4 animate-bounce-slow" />
            <p>You're all caught up! No new notifications. ✨</p>
            <p className="text-sm text-gray-500">Time to relax.</p>
          </motion.div>
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
                    hidden: { opacity: 0, y: 20, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.6)",
                    scale: 1.01,
                    transition: { duration: 0.2, type: "spring", stiffness: 300 },
                  }}
                  className={`relative p-6 rounded-2xl flex items-start gap-5 transition-all duration-300 transform cursor-pointer overflow-hidden
                    ${n.isRead
                      ? "bg-gray-800 border border-gray-700 text-gray-400 hover:border-gray-600"
                      : "bg-gray-700 border border-blue-500 shadow-xl ring-2 ring-blue-500/50 hover:ring-blue-400/70"
                    }`}
                >
                  {!n.isRead && (
                    <div className="absolute inset-0 rounded-2xl border border-blue-500 animate-border-glow pointer-events-none"></div>
                  )}

                  <div className="flex-grow">
                    <p className={`font-semibold text-xl leading-relaxed transition-colors duration-200 ${n.isRead ? "text-gray-400" : "text-white"}`}>
                      {n.message}
                    </p>
                    <span className="text-xs text-gray-500 mt-2 block font-mono">
                      {moment(n.createdAt).fromNow()}
                    </span>
                  </div>

                  <div className="flex-shrink-0 flex flex-col items-center gap-3">
                    {!n.isRead && (
                      <motion.button
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => markRead(n._id)}
                        className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md hover:from-blue-400 hover:to-blue-600 transition-all duration-200"
                        title="Mark as Read"
                      >
                        <FaCheck size={16} />
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.15, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteNotif(n._id)}
                      className="p-3 rounded-full bg-red-800 text-red-300 hover:bg-red-700 hover:text-red-100 transition-colors duration-200 shadow-md"
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
      </motion.div>
    </div>
  );
};

export default Notification;