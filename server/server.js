import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import dietRoutes from "./routes/dietRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = createServer(app);

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",             // local dev
  "https://healthxcure.netlify.app"    // deployed frontend
];

// --- Middleware ---
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// --- Socket.IO ---
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

// --- REST API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api", doctorRoutes);
app.use("/api/diet", dietRoutes);
app.use("/api/community", communityRoutes(io)); // pass socket.io
app.use("/api/reports", reportRoutes);

// --- WebSocket Events ---
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// --- DB + Server ---
connectDB();

const PORT = process.env.PORT || 5000;

try {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("❌ Server failed to start:", error.message);
}
