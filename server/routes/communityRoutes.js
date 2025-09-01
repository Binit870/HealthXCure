import { Router } from 'express';
import { getPosts, createPost } from '../controllers/communityController.js';
import jwt from 'jsonwebtoken';

const router = Router();

// Middleware to authenticate user and attach it to the request.
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("❌ Missing or malformed Authorization header");
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];

    // 🔐 Add this check immediately after extracting the token
    if (!token || token === 'null' || token === 'undefined') {
        console.log("❌ Invalid token value:", token);
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded?.user?.id || decoded?.id;

        if (!userId) {
            console.log("❌ Invalid token payload");
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = { id: userId };
        next();
    } catch (error) {
        console.log("❌ Token verification failed:", error.message);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default (io) => {
    // GET route for fetching all posts
    router.get('/posts', getPosts);

   router.post('/posts', authenticate, (req, res) => createPost(req, res, io));


    return router;
};