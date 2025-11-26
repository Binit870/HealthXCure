import Fitness from "../models/Fitness.js";

export const generateFitnessPlan = async (req, res) => {
  try {
    const { userId, height, weight, preferredExercises, weeklyGoal, targetWeight } = req.body;

    if (!height || !weight) {
      return res.status(400).json({ message: "Height and weight are required" });
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let category = "";
    let basePlan = {};

    // ---------- BASE WORKOUT PLAN BY BMI ----------
    if (bmi < 18.5) {
      category = "Underweight";
      basePlan = {
        warmup: [
          { name: "Light Jog", duration_seconds: 60 },
          { name: "Arm Circles", duration_seconds: 40 }
        ],
        main_workout: [
          { name: "Strength Training", sets: 3, reps_or_duration: "10–12 reps", rest_seconds: 60 },
          { name: "Yoga Flexibility", duration_seconds: 120 }
        ],
        cooldown: [
          { name: "Light Stretching", duration_seconds: 60 }
        ]
      };
    } else if (bmi <= 24.9) {
      category = "Normal";
      basePlan = {
        warmup: [
          { name: "Jump Rope", duration_seconds: 60 },
          { name: "Dynamic Stretch", duration_seconds: 40 }
        ],
        main_workout: [
          { name: "Running / Cycling", duration_seconds: 600 },
          { name: "Strength Training", sets: 2, reps_or_duration: "12 reps", rest_seconds: 50 }
        ],
        cooldown: [
          { name: "Yoga Stretches", duration_seconds: 90 }
        ]
      };
    } else if (bmi <= 29.9) {
      category = "Overweight";
      basePlan = {
        warmup: [
          { name: "Fast Marching", duration_seconds: 60 },
          { name: "Shoulder Rolls", duration_seconds: 40 }
        ],
        main_workout: [
          { name: "Brisk Walking", duration_seconds: 900 },
          { name: "HIIT Cycling", duration_seconds: 300 }
        ],
        cooldown: [
          { name: "Slow Stretching", duration_seconds: 90 }
        ]
      };
    } else {
      category = "Obese";
      basePlan = {
        warmup: [
          { name: "Slow Walking", duration_seconds: 60 }
        ],
        main_workout: [
          { name: "Swimming (low impact)", duration_seconds: 600 },
          { name: "Resistance Band Training", sets: 2, reps_or_duration: "10 reps" }
        ],
        cooldown: [
          { name: "Deep Breathing Stretch", duration_seconds: 90 }
        ]
      };
    }

    const caloriesGuide = {
      Underweight: "🍽️ Aim for 2200–2500 kcal/day with protein-rich foods.",
      Normal: "🍽️ Maintain 2000–2200 kcal/day with balanced meals.",
      Overweight: "🍽️ Reduce to ~1800 kcal/day, focus on lean proteins & veggies.",
      Obese: "🍽️ Stick to 1500–1700 kcal/day and consult a nutritionist."
    };

    const calories = caloriesGuide[category];

    // ---------- USER-PREFERRED EXERCISE MATCHING ----------
    const exerciseMap = {
      yoga: { name: "Yoga Session", duration_seconds: 300 },
      cycling: { name: "Cycling", duration_seconds: 600 },
      running: { name: "Running", duration_seconds: 600 },
      walk: { name: "Brisk Walk", duration_seconds: 900 },
      weightlifting: { name: "Weightlifting", sets: 3, reps_or_duration: "8 reps", rest_seconds: 60 },
      cardio: { name: "Cardio Circuit", duration_seconds: 480 },
      stretching: { name: "Stretch Routine", duration_seconds: 180 }
    };

    const preferredList = [];

    if (preferredExercises) {
      const userWords = preferredExercises.toLowerCase().split(" ");
      userWords.forEach(word => {
        if (exerciseMap[word]) preferredList.push(exerciseMap[word]);
      });
    }

    const plan = {
      warmup: basePlan.warmup,
      main_workout: [...basePlan.main_workout, ...preferredList],
      cooldown: basePlan.cooldown,
      preferred: preferredList
    };

    const tips = [
      "💧 Stay hydrated: drink at least 2-3 liters of water daily.",
      "🥗 Eat more whole foods like fruits, vegetables, and lean protein.",
      "🛌 Sleep at least 7–8 hours every night.",
      "🚶 Take breaks during work to stretch.",
      "🏃 Consistency is the key to progress."
    ];

    const tip = tips[Math.floor(Math.random() * tips.length)];

    // Save to DB
    if (userId) {
      await new Fitness({
        userId, height, weight, bmi, category,
        calories, plan, targetWeight, weeklyGoal, preferredExercises
      }).save();
    }

    res.json({ bmi, category, calories, plan, tip });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// 📌 Save a new fitness entry (UPDATED)
export const saveFitnessData = async (req, res) => {
  try {
    // Destructure new fields: targetWeight, weeklyGoal
    const { userId, height, weight, bmi, category, calories, plan, targetWeight, weeklyGoal } = req.body;

    if (!userId || !height || !weight || !bmi) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // Pass new fields to the Mongoose model
    const entry = new Fitness({ userId, height, weight, bmi, category, calories, plan, targetWeight, weeklyGoal });
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
