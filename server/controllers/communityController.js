import Post from '../models/Post.js';
import User from '../models/User.js';

// GET all posts
// GET all posts (with optional category filter)
export const getPosts = async (req, res) => {
    try {
        const { category } = req.query;

        let filter = {};
        if (category && category !== "all") {
            filter.category = category;
        }

        const posts = await Post.find(filter)
            .populate("user", "name profileImageUrl")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching community posts:", error);
        res.status(500).json({ message: "Failed to fetch community posts" });
    }
};


// POST a new post
// POST a new post
export const createPost = async (req, res, io) => {
    const { content, category } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required." });
    }
    if (!category) {
        return res.status(400).json({ message: "Category is required." });
    }

    try {
        const currentUser = await User.findById(req.user.id);
        if (!currentUser) {
            return res.status(404).json({ message: "User not found." });
        }

        const newPost = new Post({
            content,
            category, // ✅ save category
            user: currentUser._id,
        });

        const savedPost = await newPost.save();

        const populatedPost = await Post.findById(savedPost._id).populate(
            "user",
            "name profileImageUrl"
        );

        io.emit("newPost", populatedPost);

        res.status(201).json(populatedPost);
    } catch (error) {
        console.error("Error creating community post:", error);
        res.status(500).json({ message: "Failed to create post" });
    }
};


// ⭐️ DELETE a post
export const deletePost = async (req, res) => {
    // Extract the post ID from the request parameters
    const postId = req.params.id;
    // Extract the authenticated user's ID from the request
    const userId = req.user.id;

    if (!postId) {
        return res.status(400).json({ message: "Post ID is required." });
    }

    try {
        // Find and delete the post. CRITICAL: The query ensures that
        // the post's user ID matches the authenticated user's ID,
        // preventing a user from deleting another user's post.
        const deletedPost = await Post.findOneAndDelete({
            _id: postId,
            user: userId
        });

        if (!deletedPost) {
            // If deletedPost is null, the post was not found,
            // or the user was not the owner.
            return res.status(404).json({ message: "Post not found or you are not authorized to delete it." });
        }

        // Send a success message
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Failed to delete post" });
    }
};