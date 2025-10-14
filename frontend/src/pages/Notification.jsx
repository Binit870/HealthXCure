import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import API, { SOCKET_URL } from "../utils/Api";
import { FaBell, FaCheck, FaTrashAlt, FaGhost, FaEnvelopeOpenText, FaTimes } from "react-icons/fa"; 
import { useAuth } from '../context/AuthContext';
import moment from 'moment';

// Define filter types as constants for clarity
const FILTER_ALL = 'all';
const FILTER_UNREAD = 'unread';
const FILTER_READ = 'read';

const Notification = () => {
  const { user, loading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState(FILTER_ALL); 
  const socketRef = useRef(null);

  // --- Core Functionality (Fetching & Socket) ---
  useEffect(() => {
    if (loading || !user) return;

    socketRef.current = io(SOCKET_URL, {
      withCredentials: true,
    });

    socketRef.current.emit("join", user._id);

    const fetchNotifications = async () => {
      try {
        const res = await API.get(`/notifications`);
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err.message);
      }
    };

    fetchNotifications();

    socketRef.current.on("newNotification", (notif) => {
      if (notif.userId?.toString() === user._id.toString()) {
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

  // --- Action Handlers ---

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

  const markAllRead = async () => {
    try {
      await API.put(`/notifications/read-all`); 
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (err) {
      console.error("Error marking all as read:", err.message);
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

  // New Feature Handlers: DELETE ALL based on Filter

  const deleteAllNotifications = async () => {
    if (!window.confirm("Are you sure you want to delete ALL notifications? This action cannot be undone.")) return;
    try {
      await API.delete(`/notifications/all`);
      setNotifications([]); 
      setFilter(FILTER_ALL);
    } catch (err) {
      console.error("Error deleting all notifications:", err.message);
    }
  };

  const deleteReadNotifications = async () => {
    if (!window.confirm("Are you sure you want to delete all READ notifications?")) return;
    try {
      await API.delete(`/notifications/read`);
      setNotifications((prev) => prev.filter((n) => !n.isRead)); 
      setFilter(FILTER_ALL);
    } catch (err) {
      console.error("Error deleting read notifications:", err.message);
    }
  };

  const deleteUnreadNotifications = async () => {
    if (!window.confirm("Are you sure you want to delete all UNREAD notifications?")) return;
    try {
      await API.delete(`/notifications/unread`);
      setNotifications((prev) => prev.filter((n) => n.isRead)); 
      setFilter(FILTER_ALL);
    } catch (err) {
      console.error("Error deleting unread notifications:", err.message);
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
  
  // --- Filtering Logic & UI helpers ---

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const readCount = notifications.length - unreadCount;
  
  // FIX: This must be defined before currentCount uses it.
  const filteredNotifications = notifications.filter(n => {
    if (filter === FILTER_UNREAD) return !n.isRead;
    if (filter === FILTER_READ) return n.isRead;
    return true; // FILTER_ALL
  });
  const currentCount = filteredNotifications.length;

  const getButtonClass = (buttonFilter) => 
    `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
      filter === buttonFilter
        ? 'bg-cyan-500 text-white shadow-md'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`;


  return (
    <div className="min-h-screen py-10 flex justify-center bg-gradient-to-br from-cyan-50 to-blue-100"> 
      <div className="w-full max-w-4xl p-6 bg-white shadow-xl rounded-xl border border-gray-200 h-fit">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
            <FaBell className="text-cyan-500 text-3xl" /> Notifications
          </h2>
        </div>

        {/* Filter Tabs, Read All, and Delete All Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
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
            {/* Conditional Read All Button */}
            {filter === FILTER_UNREAD && unreadCount > 0 && (
              <button 
                onClick={markAllRead} 
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 shadow-md"
                title="Mark all unread notifications as read"
              >
                <FaEnvelopeOpenText size={14} /> Read All
              </button>
            )}
            
            {/* Conditional Delete All Button */}
            {currentCount > 0 && (
              <button 
                onClick={handleDeleteAll} 
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 shadow-md"
                title={`Delete all ${filter} notifications`}
              >
                <FaTimes size={14} /> Delete All
              </button>
            )}
          </div>
        </div>
        
        {/* --- Notification List Content --- */}

        {filteredNotifications.length === 0 ? (
          <div className="text-gray-500 text-center py-12 flex flex-col items-center gap-4">
            <FaGhost className="text-gray-300 text-5xl mb-3" />
            <p className="text-lg font-medium">
              {filter === FILTER_ALL && "You're all caught up! No notifications. 🎉"}
              {filter === FILTER_UNREAD && "No unread notifications here! Go relax. 😎"}
              {filter === FILTER_READ && "No read notifications found. 😉"}
            </p>
            <p className="text-sm text-gray-400">Time to relax.</p>
          </div>
        ) : (
          /* Notification List */
          <ul className="space-y-4">
            {filteredNotifications.map((n) => (
              <li
                key={n._id}
                className={`p-4 rounded-lg flex items-start gap-4 transition-colors duration-200
                  ${n.isRead
                    ? "bg-white border border-gray-200 text-gray-600 hover:shadow-md"
                    : "bg-cyan-50 border border-cyan-200 text-gray-800 font-medium shadow-sm hover:shadow-lg" 
                  }`}
              >
                <div className="flex-grow">
                  <p className={`text-base leading-relaxed ${n.isRead ? "text-gray-600" : "text-gray-900 font-semibold"}`}>
                    {n.message}
                  </p>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {moment(n.createdAt).fromNow()}
                  </span>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2">
                  {/* Mark Read/Unread Button */}
                  {!n.isRead && (
                    <button
                      onClick={() => markRead(n._id)}
                      className="p-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-150 shadow-md" 
                      title="Mark as Read"
                    >
                      <FaCheck size={14} />
                    </button>
                  )}
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteNotif(n._id)}
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-150"
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