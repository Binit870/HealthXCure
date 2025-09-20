import cron from "node-cron";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

const healthMessages = [
  "🧠 Don't forget to take a walk today to boost your energy!",
  "💧 Stay hydrated! Drinking a glass of water can improve focus.",
  "🧘‍♂️ Take a moment to stretch and de-stress your mind.",
  "🍎 An apple a day... or any fruit! Aim for at least one serving today.",
  "☀️ Get some sunshine! Vitamin D is great for your mood and bones.",
  "🚶‍♀️ Take a break. Stand up and stretch every hour to prevent stiffness.",
  "😴 Prioritize sleep. Aim for 7-9 hours of quality rest tonight.",
  "🥦 Eat your greens! Add a vegetable to your next meal for an immunity boost.",
  "💪 A 10-minute walk can improve your heart health. Give it a try!",
  "😂 Laughter is the best medicine. Find a reason to smile today!",
  "🚫 Cut down on sugar. Try a healthy snack like nuts or yogurt instead.",
  "🎶 Listen to music. It can reduce stress and improve your mental state.",
  "🫂 Connect with someone. A quick chat can brighten your day.",
  "📖 Read a book instead of scrolling. It's a great way to wind down.",
  "🙏 Practice gratitude. Write down three things you're thankful for.",
  "🥤 Swap a sugary drink for a refreshing cup of green tea.",
  "🧘‍♀️ Try a 5-minute meditation. It can help calm your mind.",
  "💦 Wash your hands often to stay safe and healthy.",
  "💡 Set a small, achievable health goal for the day and celebrate when you reach it.",
  "🥖 Choose whole grains over refined carbs for more energy.",
  "🤸‍♂️ Do a few squats while you wait for the kettle to boil. Every bit of movement helps!",
  "🎨 Get creative. Hobbies like drawing or knitting are great for your brain.",
  "🥦 Cook a healthy meal at home instead of ordering out.",
  "🗣️ Talk about your feelings. It's a sign of strength, not weakness.",
  "🚰 Drink a glass of water right after you wake up to kickstart your day.",
  "⏳ Take a moment to just breathe deeply. Inhale peace, exhale stress.",
  "👟 Choose the stairs over the elevator. It’s an easy win for your fitness.",
  "💡 Listen to your body. If you're tired, it's okay to rest.",
  "🧑‍💻 Check your posture. Sit up straight to prevent back pain.",
  "🛏️ Create a bedtime routine to improve the quality of your sleep."
];

const startCronJob = (io) => {
  cron.schedule("0 21 * * *", async () => {
    try {
      console.log("⏰ Running daily health notification job...");
      const randomMessage = healthMessages[Math.floor(Math.random() * healthMessages.length)];
      const users = await User.find({});
      for (const user of users) {
        const notification = new Notification({ userId: user._id, message: randomMessage });
        await notification.save();
        io.to(user._id.toString()).emit("newNotification", notification);
      }
      console.log("✅ Daily health notification sent!");
    } catch (err) {
      console.error("❌ Error in daily health cron job:", err.message);
    }
  });
};

export default startCronJob;