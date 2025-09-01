import Post from '../models/Post.js';
import User from '../models/User.js';

// GET all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', 'name profileImageUrl')
            .sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching community posts:", error);
        res.status(500).json({ message: "Failed to fetch community posts" });
    }
};

// POST a new post
export const createPost = async (req, res, io) => {
    const { content } = req.body;
    
    if (!content) {
        return res.status(400).json({ message: "Content is required." });
    }
console.log("🔥 createPost triggered");
console.log("req.user:", req.user);

    try {
        const currentUser = await User.findById(req.user.id);
        if (!currentUser) {
            return res.status(404).json({ message: "User not found." });
        }

        const newPost = new Post({
            content,
            user: currentUser._id,
        });

        const savedPost = await newPost.save();

        const populatedPost = await Post.findById(savedPost._id)
            .populate('user', 'name profileImageUrl');

        io.emit('newPost', populatedPost);

        res.status(201).json(populatedPost);
    } catch (error) {
        console.error("Error creating community post:", error);
        res.status(500).json({ message: "Failed to create post" });
    }
};