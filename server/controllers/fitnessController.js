import Fitness from "../models/Fitness.js";

export const generateFitnessPlan = async (req, res) => {
  try {
    const { userId, height, weight } = req.body;
    if (!height || !weight) {
      return res.status(400).json({ message: "Height and weight are required" });
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let category = "";
    let plan = [];
    let calories = "";

    if (bmi < 18.5) {
      category = "Underweight";
      plan = [
        { name: "Strength Training (3x/week)" },
        { name: "Yoga for flexibility" },
        { name: "Weightlifting basics" },
      ];
      calories = "🍽️ Aim for 2200–2500 kcal/day with protein-rich foods.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = "Normal";
      plan = [
        { name: "Cardio (running/cycling)" },
        { name: "Strength Training (2x/week)" },
        { name: "Stretching & Yoga" },
      ];
      calories = "🍽️ Maintain around 2000–2200 kcal/day with a balanced diet.";
    } else if (bmi >= 25 && bmi <= 29.9) {
      category = "Overweight";
      plan = [
        { name: "Brisk Walking (daily)" },
        { name: "Cycling / HIIT (3-4x/week)" },
        { name: "Bodyweight Training" },
      ];
      calories = "🍽️ Reduce to ~1800 kcal/day, focusing on lean proteins & veggies.";
    } else {
      category = "Obese";
      plan = [
        { name: "Walking (daily, low impact)" },
        { name: "Swimming (safe cardio)" },
        { name: "Resistance Bands" },
      ];
      calories = "🍽️ Stick to 1500–1700 kcal/day, consult a nutritionist.";
    }

    const tips = [
      "💧 Stay hydrated: drink at least 2-3 liters of water daily.",
      "🥗 Eat more whole foods like fruits, vegetables, and lean protein.",
      "🛌 Sleep at least 7–8 hours every night for better recovery.",
      "🚶 Take small breaks during work to stretch and move around.",
      "🏃 Consistency beats intensity — small steps daily matter!",
    ];
    const tip = tips[Math.floor(Math.random() * tips.length)];

    // ✅ Save in DB if userId is provided
    if (userId) {
      const fitnessData = new Fitness({
        userId,
        height,
        weight,
        bmi,
        category,
        plan,
        calories,
        tip,
      });
      await fitnessData.save();
    }

    res.json({ bmi, category, plan, calories, tip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// 📌 Save a new fitness entry
export const saveFitnessData = async (req, res) => {
  try {
    const { userId, height, weight, bmi, category, calories, plan } = req.body;

    if (!userId || !height || !weight || !bmi) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const entry = new Fitness({ userId, height, weight, bmi, category, calories, plan });
    await entry.save();

    res.json({ success: true, entry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 📌 Get all fitness history for a user
export const getFitnessHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await Fitness.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteFitnessEntry = async (req, res) => {
  try {
    const { entryId } = req.params;

    const result = await Fitness.findByIdAndDelete(entryId);

    if (!result) {
      return res.status(404).json({ success: false, message: "Entry not found." });
    }

    res.status(200).json({ success: true, message: "Fitness entry deleted successfully." });
  } catch (err) {
    console.error("❌ Error deleting fitness entry:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};