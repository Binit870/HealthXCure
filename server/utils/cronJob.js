import cron from "node-cron";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { healthMessages } from "./healthMessages.js";

const startCronJob = (io) => {

  cron.schedule(
    "30 3 * * *", // 3:30 AM UTC = 9:00 AM IST
    async () => {
      try {
        const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        console.log(`⏰ Running health notification job at ${now} (IST)`);

        const randomMessage =
          healthMessages[Math.floor(Math.random() * healthMessages.length)];
        const users = await User.find({});

        for (const user of users) {
          const notification = new Notification({
            userId: user._id,
            message: randomMessage,
          });
          await notification.save();

          io.to(user._id.toString()).emit("newNotification", notification);
        }

        console.log("✅ Daily notifications sent successfully!");
      } catch (err) {
        console.error("❌ Error in daily job:", err);
      }
    },
    {
      scheduled: true,
      timezone: "UTC", // Render uses UTC only
    }
  );
};

export default startCronJob;
