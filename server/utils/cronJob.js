import cron from "node-cron";
import axios from "axios";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { healthMessages } from "./healthMessages.js";

const ONE_SIGNAL_APP_ID = process.env.ONE_SIGNAL_APP_ID;
const ONE_SIGNAL_REST_API_KEY = process.env.ONE_SIGNAL_API_KEY; 
// console.log("Using OneSignal API Key:", ONE_SIGNAL_REST_API_KEY);

const startCronJob = (io) => {
  cron.schedule("0 9 * * *", async () => { // runs at 9:00 AM IST
    try {
      console.log("⏰ Sending daily health notifications...");
      const randomMessage = healthMessages[Math.floor(Math.random() * healthMessages.length)];
      const users = await User.find({});
      for (const user of users) {
        const notification = new Notification({
          userId: user._id,
          message: randomMessage,
        });
        await notification.save();

        // Real-time (for online users)
        io.to(user._id.toString()).emit("newNotification", notification);
      }

      await axios.post(
        "https://api.onesignal.com/notifications",
        {
          app_id: ONE_SIGNAL_APP_ID,
          included_segments: ["All"],
          headings: { en: "Daily Health Tip 🌿" },
          contents: { en: randomMessage },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${ONE_SIGNAL_REST_API_KEY}`,
          },
        }
      );

      console.log("✅ Push + DB notifications sent successfully!");
    } catch (err) {
      console.error("❌ Error in daily job:", err.message);
    }
  });
};

export default startCronJob;
