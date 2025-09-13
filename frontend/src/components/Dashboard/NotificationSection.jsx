import React, { useEffect, useState } from "react";
import { FaBell, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const NotificationSection = ({ user }) => {
  const [notifications, setNotifications] = useState([]);

  // Simulate fetching notifications (replace with API call later)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Example: API call
        // const response = await API.get(`/user/${user._id}/notifications`);
        // setNotifications(response.data);

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
    <div className="rounded-3xl p-8 shadow-xl bg-gradient-to-br from-gray-700 to-gray-800 transition-shadow duration-300 hover:shadow-2xl">
      <h4 className="text-2xl font-bold mb-6 text-white flex items-center">
        <FaBell className="mr-4 text-yellow-400 text-3xl animate-bounce" />
        Notifications
      </h4>

      {notifications.length > 0 ? (
        <ul className="space-y-4 text-gray-200">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className="border-t border-gray-600 pt-4 flex justify-between items-center hover:bg-gray-800 p-3 rounded-lg transition-colors duration-200"
            >
              <div>
                <p className="text-sm text-gray-400">{notif.date}</p>
                <p className="text-lg">
                  {notif.type === "success" ? (
                    <FaCheckCircle className="inline text-green-400 mr-2" />
                  ) : (
                    <FaTimesCircle className="inline text-red-400 mr-2" />
                  )}
                  {notif.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-lg">No new notifications 🎉</p>
      )}
    </div>
  );
};

export default NotificationSection;
