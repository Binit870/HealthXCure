import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import cron from "node-cron";

import Notification from "./models/Notification.js";
import User from "./models/User.js";   // ✅ import User model
import notificationRoutes from "./routes/notificationRoutes.js";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import dietRoutes from "./routes/dietRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import fitnessRoutes from "./routes/fitnessRoutes.js";
import symptomRoutes from "./routes/symptomRoutes.js";


dotenv.config();
const __dirname = path.resolve();

const app = express();
const server = createServer(app);

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://healthxcure.netlify.app",
];

// --- Middleware ---
app.use(express.json());


app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// --- Static Files ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- WebSocket Setup (single instance) ---
const io = new Server(server, {
  cors: { origin: allowedOrigins, methods: ["GET", "POST"] }
});

// --- WebSocket Events ---
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // ✅ Join user-specific room when frontend emits "join"
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their notification room`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// --- REST API Routes ---
app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);
app.use("/api/ai", symptomRoutes);
app.use("/api", doctorRoutes);
app.use("/api/diet", dietRoutes);
app.use("/api/community", communityRoutes(io));
app.use("/api/reports", reportRoutes);
app.use("/api/user", userRoutes);
app.use("/api/fitness", fitnessRoutes);
app.use("/api/notifications", notificationRoutes);

app.use((req, res, next) => {
  console.log(`❌ Unmatched route: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Route not found' });
});
// ✅ Health tips list
const healthTips = [
  "💧 Stay hydrated! Drink at least 8 glasses of water today.",
  "🥦 Eat more greens to boost your immunity.",
  "🏃‍♂️ A 30-minute walk can improve your heart health.",
  "😴 Aim for 7–8 hours of quality sleep tonight.",
  "🧘‍♀️ Take 5 minutes to practice deep breathing and reduce stress."
];

// --- Daily Notification Job (runs every day at 9 AM IST) ---
cron.schedule("0 9 * * *", async () => {
  try {
    console.log("⏰ Running daily health notification job...");

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


// --- DB + Server ---
connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
