import express from "express";
import multer from "multer";
import { chatWithAI, uploadFileToAI,getChatHistory,deleteChatHistory,deleteSingleMessage } from "../controllers/chatController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/chat", chatWithAI);
router.post("/upload", upload.single("file"), uploadFileToAI);
router.get("/chat/history/:userId", getChatHistory);
router.delete("/chat/history/:userId", deleteChatHistory);
router.delete("/chat/message/:userId/:messageId", deleteSingleMessage);

export default router;
