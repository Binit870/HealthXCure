import cron from "node-cron";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { healthMessages } from "./healthMessages.js";

const startCronJob = (io) => {
  cron.schedule("0 9 * * *", async () => {
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

        io.to(user._id.toString()).emit("newNotification", notification);
      }

      console.log("✅ DB + socket notifications sent successfully!");
    } catch (err) {
      console.error("❌ Error in daily job:", err.message);
    }
  });
};

export default startCronJob;
