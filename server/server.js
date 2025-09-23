import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import startCronJob from "./utils/cronJob.js"; // Import the cron job function

// ✅ Import all your routes
import notificationRoutes from "./routes/notificationRoutes.js";
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

// --- WebSocket Setup ---
const io = new Server(server, {
  cors: { origin: allowedOrigins, methods: ["GET", "POST"] , credentials: true },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("join", (userId) => {
    socket.join(userId);
    
  });
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// --- REST API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api", doctorRoutes);
app.use("/api/diet", dietRoutes);
app.use("/api/community", communityRoutes(io));
app.use("/api/reports", reportRoutes);
app.use("/api/user", userRoutes);
app.use("/api/fitness", fitnessRoutes);
app.use("/api/notifications", notificationRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// --- DB + Server ---
connectDB();
startCronJob(io); // ✅ Call the cron job function after the server starts

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});