import express from 'express';
import { registerUser, loginUser,googleLogin,setPassword } from "../controllers/authController.js";


const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.post("/set-password", setPassword);

export default router;