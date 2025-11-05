import mongoose from "mongoose";

const ExerciseDetailSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sets: { type: Number },
    reps_or_duration: { type: String }, // e.g., "10-12 reps" or "60 seconds"
    rest_seconds: { type: Number },
    duration_seconds: { type: Number }, // For warm-up/cool-down
});

const fitnessSchema = new mongoose.Schema({
    userId: { type: String, required: true }, 
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    
    // --- Frontend Inputs ---
    targetWeight: { type: Number, default: null }, 
    weeklyGoal: { type: String, default: '3 sessions/week (Beginner)' }, 
    preferredExercises: { type: String, default: "" }, // NEW FIELD 
    
    // --- Calculated Data ---
    bmi: { type: Number, required: true },
    category: { type: String, required: true },
    calories: { type: String, required: true },
    
    // UPDATED: Use Mixed to store the full structured JSON plan from Gemini
    plan: { 
        type: mongoose.Schema.Types.Mixed, 
        required: true,
    },
    
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Fitness", fitnessSchema);