import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import dietRoutes from "./routes/dietRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const __dirname = path.resolve();

const app = express();
const server = createServer(app);

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
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
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// --- REST API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api", doctorRoutes);
app.use("/api/diet", dietRoutes);
app.use("/api/community", communityRoutes(io)); // ✅ pass existing io instance
app.use("/api/reports", reportRoutes);
app.use("/api/user", userRoutes);

// --- DB + Server ---
connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
