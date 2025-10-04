import mongoose from 'mongoose';

const SymptomHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to a User model if you have one
        required: true
    },
    symptoms: {
        type: [String],
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    results: {
        type: Array, // Store the array of conditions returned by the AI
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('SymptomHistory', SymptomHistorySchema);