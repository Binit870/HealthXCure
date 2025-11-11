import cron from "node-cron";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { healthMessages } from "./healthMessages.js";

const startCronJob = (io) => {
  // Runs every day at 9:00 AM IST
  cron.schedule(
    "0 9 * * *",
    async () => {
      try {
        const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        console.log(`⏰ Running health notification job at ${now} (IST)`);

        // Pick a random message
        const randomMessage =
          healthMessages[Math.floor(Math.random() * healthMessages.length)];

        // Get all users
        const users = await User.find({});

        for (const user of users) {
          const notification = new Notification({
            userId: user._id,
            message: randomMessage,
          });
          await notification.save();

          // Emit notification to the user's socket room
          io.to(user._id.toString()).emit("newNotification", notification);
        }

        console.log("✅ Daily notifications sent successfully!");
      } catch (err) {
        console.error("❌ Error in daily job:", err);
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata", // Run at 9:00 AM IST
    }
  );
};

export default startCronJob;
