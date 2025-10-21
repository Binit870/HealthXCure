import React, { useEffect, useState } from "react";
import { FaBell, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const NotificationSection = ({ user }) => {
  const [notifications, setNotifications] = useState([]);

  // Simulate fetching notifications (replace with API call later)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Temporary mock data
        setNotifications([
          {
            id: 1,
            type: "success",
            message: "Your new diet plan has been generated! 🥗",
            date: new Date().toLocaleDateString(),
          },
          {
            id: 2,
            type: "alert",
            message: "You missed logging your sleep data yesterday 😴",
            date: new Date().toLocaleDateString(),
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [user]);

  return (
    // Redesigned card: Light background, subtle shadow, teal border/accent
    <div className="rounded-3xl p-8 shadow-xl bg-white border border-teal-100 transition-shadow duration-300 hover:shadow-2xl">
      <h4 className="text-2xl font-bold mb-6 text-teal-700 flex items-center">
        {/* Icon color switched to warm yellow/orange for contrast and importance */}
        <FaBell className="mr-4 text-orange-400 text-3xl animate-bounce" />
        Notifications
      </h4>

      {notifications.length > 0 ? (
        <ul className="space-y-4 text-gray-800">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              // Separator is light gray
              className="border-t border-gray-200 pt-4 flex justify-between items-center hover:bg-teal-50/50 p-3 rounded-xl transition-colors duration-200"
            >
              <div>
                <p className="text-sm text-gray-500">{notif.date}</p>
                <p className="text-lg">
                  {notif.type === "success" ? (
                    <FaCheckCircle className="inline text-teal-500 mr-2" />
                  ) : (
                    <FaTimesCircle className="inline text-red-500 mr-2" />
                  )}
                  {notif.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-lg">No new notifications 🎉</p>
      )}
    </div>
  );
};

export default NotificationSection;