import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: { type: String, enum: ["general", "nutrition", "fitness", "health"], default: "general" },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('Post', postSchema);