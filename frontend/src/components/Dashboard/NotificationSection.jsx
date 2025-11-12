import React, { useEffect, useState } from "react";
import { FaBell, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import API from "../../utils/Api";
import moment from "moment";
import { toast } from "react-hot-toast"; // ✅ You already use react-hot-toast elsewhere

const NotificationSection = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchTodayNotifications = async () => {
      try {
        const res = await API.get("/notifications");
        const allNotifications = res.data;

        const today = moment().startOf("day");
        const todayNotifications = allNotifications.filter((notif) =>
          moment(notif.createdAt).isSame(today, "day")
        );

        if (todayNotifications.length === 0) {
          toast("No notifications for today yet 🎉", {
            icon: "📭",
            style: {
              background: "#f0fdfa",
              color: "#0f766e",
              border: "1px solid #99f6e4",
            },
          });
        }

        setNotifications(todayNotifications);
      } catch (error) {
        toast.error("Failed to fetch today’s notifications ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchTodayNotifications();
  }, [user]);

  if (loading) {
    return (
      <div className="rounded-3xl p-8 shadow-xl bg-white border border-teal-100 text-center text-teal-600">
        <p>Loading today’s notifications...</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl p-8 shadow-xl bg-white border border-teal-100 transition-shadow duration-300 hover:shadow-2xl">
      <h4 className="text-2xl font-bold mb-6 text-teal-700 flex items-center">
        <FaBell className="mr-4 text-orange-400 text-3xl animate-bounce" />
        Today’s Notifications
      </h4>

      {notifications.length > 0 ? (
        <ul className="space-y-4 text-gray-800">
          {notifications.map((notif) => (
            <li
              key={notif._id}
              className="border-t border-gray-200 pt-4 flex justify-between items-center hover:bg-teal-50/50 p-3 rounded-xl transition-colors duration-200"
            >
              <div>
                <p className="text-sm text-gray-500">
                  {moment(notif.createdAt).format("LLL")}
                </p>
                <p className="text-lg">
                  {notif.type === "success" ? (
                    <FaCheckCircle className="inline text-teal-500 mr-2" />
                  ) : notif.type === "error" ? (
                    <FaTimesCircle className="inline text-red-500 mr-2" />
                  ) : (
                    <FaCheckCircle className="inline text-teal-400 mr-2" />
                  )}
                  {notif.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-lg text-center">
          No notifications for today yet 🎉
        </p>
      )}
    </div>
  );
};

export default NotificationSection;
