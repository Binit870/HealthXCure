import cron from "node-cron";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { healthMessages } from "./healthMessages.js";

const startCronJob = (io) => {
  // Every minute for testing (later change to "0 21 * * *" for 9PM daily)
  cron.schedule("0 21 * * *", async () => {
    try {
      console.log("⏰ Running random health notification job...");
      const randomMessage = healthMessages[Math.floor(Math.random() * healthMessages.length)];
      const users = await User.find({});

      for (const user of users) {
        const notification = new Notification({
          userId: user._id,
          message: randomMessage,
        });
        await notification.save();

        // Push instantly via socket.io
        io.to(user._id.toString()).emit("newNotification", notification);
      }

      console.log("✅ Random health notification sent!");
    } catch (err) {
      console.error("❌ Error in cron job:", err.message);
    }
  });
};

export default startCronJob;
