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
  FaTimes,
  FaPills,
  FaHeartbeat,
  FaBell as FaBellAlt,
  FaCommentDots,
  FaExclamationTriangle,
  FaStethoscope,
  FaSyringe,
  FaUserMd,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import "./Notification.css";

/** Floating background component */
const FloatingBackground = () => {
  const particles = [
    { id: "p1", type: "pill", size: 60 },
    { id: "p2", type: "heart", size: 70 },
    { id: "p3", type: "stethoscope", size: 64 },
    { id: "p4", type: "syringe", size: 58 },
    { id: "p5", type: "doctor", size: 72 },
    { id: "p6", type: "chat", size: 60 },
    { id: "p7", type: "alert", size: 55 },
    { id: "p8", type: "bell", size: 68 },
    { id: "p9", type: "pill", size: 65 },
    { id: "p10", type: "heart", size: 75 },
  ];

const random = (min, max) => Math.random() * (max - min) + min;

// Predefine positions with spacing
const positions = [
  { left: "10%", top: "15%" },
  { left: "30%", top: "25%" },
  { left: "50%", top: "10%" },
  { left: "70%", top: "20%" },
  { left: "85%", top: "40%" },
  { left: "60%", top: "55%" },
  { left: "40%", top: "70%" },
  { left: "20%", top: "60%" },
  { left: "75%", top: "80%" },
  { left: "35%", top: "85%" },
];


  const IconForType = ({ type, size }) => {
    const common = { size, "aria-hidden": true };
    switch (type) {
      case "pill":
        return <FaPills {...common} />;
      case "heart":
        return <FaHeartbeat {...common} />;
      case "bell":
        return <FaBellAlt {...common} />;
      case "chat":
        return <FaCommentDots {...common} />;
      case "alert":
        return <FaExclamationTriangle {...common} />;
      case "stethoscope":
        return <FaStethoscope {...common} />;
      case "syringe":
        return <FaSyringe {...common} />;
      case "doctor":
        return <FaUserMd {...common} />;
      default:
        return <FaHeartbeat {...common} />;
    }
  };

  return (
    <div className="floating-bg" aria-hidden="true">
      {particles.map((p, idx) => {
        const { left, top } = positions[idx % positions.length];

        const delay = `${random(-30, 0)}s`;
        const duration = `${random(18, 36)}s`;
        const extraClass =
          idx % 3 === 0 ? "p-color-accent" : idx % 2 === 0 ? "p-color-dark" : "p-color-deep";

        const style = {
          left,
          top,
          width: `${p.size}px`,
          height: `${p.size}px`,
          animation: `floatDrift ${duration} linear ${delay} infinite`,
          transformOrigin: "center",
        };

        const innerStyle = {
          animation: `softPulse ${random(6, 12)}s ease-in-out ${random(0, 4)}s infinite`,
        };

        return (
          <div key={p.id} className={`particle ${extraClass} p-soft`} style={style}>
            <div style={innerStyle}>
              <IconForType type={p.type} size={p.size} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Constants
const FILTER_ALL = "all";
const FILTER_UNREAD = "unread";
const FILTER_READ = "read";

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: "easeOut" } },
  exit: { opacity: 0, y: 8, scale: 0.995, transition: { duration: 0.2 } },
};

const bellPulseVariants = {
  idle: { scale: 1, rotate: 0 },
  pulse: {
    scale: [1, 1.12, 1],
    rotate: [0, 6, -6, 0],
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const Notification = () => {
  const { user, loading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState(FILTER_ALL);
  const socketRef = useRef(null);
  const [hasNewPulse, setHasNewPulse] = useState(false);

  useEffect(() => {
    if (loading || !user) return;

    socketRef.current = io(SOCKET_URL, { withCredentials: true });
    socketRef.current.emit("join", user._id);

    const fetchNotifications = async () => {
      try {
        const res = await API.get(`/notifications`);
        setNotifications(res.data);
      } catch (err) {
        toast.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();

    socketRef.current.on("newNotification", (notif) => {
      if (notif.userId?.toString() === user._id.toString()) {
        setNotifications((prev) => [notif, ...prev]);
        setHasNewPulse(true);
        setTimeout(() => setHasNewPulse(false), 1200);
      }
    });

    return () => {
      socketRef.current?.off("newNotification");
      socketRef.current?.disconnect();
    };
  }, [user, loading]);

// --- FIXED NOTIFICATION HANDLERS ---

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

  return (
    <div className="min-h-screen py-10 flex justify-center  relative"
    style={{
            background: `
              radial-gradient(1200px 600px at 10% 20%, rgba(34, 227, 218, 0.08), transparent 8%),
              radial-gradient(1000px 500px at 90% 85%, rgba(6, 182, 212, 0.08), transparent 8%),
              linear-gradient(180deg, #e6fffa 0%, #ccfbf1 100%)
            `,
          }}>
      <FloatingBackground />

      <div
        className="w-full max-w-4xl p-6 bg-white shadow-xl rounded-xl border border-gray-200 h-fit relative"
        style={{ zIndex: 1 }}
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
            <motion.span
              aria-hidden
              initial="idle"
              animate={hasNewPulse ? "pulse" : "idle"}
              variants={bellPulseVariants}
              className="text-cyan-500"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <FaBell className="text-3xl" />
            </motion.span>
            Notifications
          </h2>
          <div className="text-sm text-gray-500">
            Calm & focused — Patient safety first
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setFilter(FILTER_ALL)} className={getButtonClass(FILTER_ALL)}>
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
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 shadow-md"
              >
                <FaEnvelopeOpenText size={14} /> Read All
              </button>
            )}

            {currentCount > 0 && (
              <button
                onClick={handleDeleteAll}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 shadow-md"
              >
                <FaTrashAlt size={14} /> Delete All
              </button>
            )}
          </div>
        </div>

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
          <motion.ul
            className="space-y-4"
            variants={listVariants}
            initial="hidden"
            animate="show"
            role="list"
          >
            <AnimatePresence>
              {filteredNotifications.map((n) => (
                <motion.li
                  key={n._id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  layout
                  whileHover={{
                    translateY: -6,
                    boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
                  }}
                  className={`p-4 rounded-lg flex items-start gap-4 transition-colors duration-200
                    ${
                      n.isRead
                        ? "bg-white border border-gray-200 text-gray-600 hover:shadow-md"
                        : "bg-cyan-50 border border-cyan-200 text-gray-800 font-medium shadow-sm hover:shadow-lg"
                    }
                  `}
                >
                  <div className="flex-grow">
                    <p
                      className={`text-base leading-relaxed ${
                        n.isRead
                          ? "text-gray-600"
                          : "text-gray-900 font-semibold"
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
                      <motion.button
                        onClick={() => markRead(n._id)}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-150 shadow-md"
                        title="Mark as Read"
                      >
                        <FaCheck size={14} />
                      </motion.button>
                    )}

                    <motion.button
                      onClick={() => deleteNotif(n._id)}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-150"
                      title="Delete"
                    >
                      <FaTrashAlt size={14} />
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
