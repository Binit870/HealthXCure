// ✅ Keyword-to-route mapping
const PageMappings = {
  // 🩺 Doctor Finder
  "find": "/find-doctors",
  "doctor": "/find-doctors",
  "doctors": "/find-doctors",
  "nearby": "/find-doctors",
  "hospital": "/find-doctors",
  "clinic": "/find-doctors",
  "specialist": "/find-doctors",
  "appointment": "/find-doctors",

  // ⚕️ Diagnosis / Symptom Checker
  "diagnosis": "/symptom-checker",
  "symptom": "/symptom-checker",
  "checker": "/symptom-checker",
  "disease": "/symptom-checker",
  "check": "/symptom-checker",
  "issue": "/symptom-checker",
  "health": "/symptom-checker",

  // 📄 Reports
  "report": "/reports",
  "reports": "/reports",
  "medical": "/reports",
  "lab": "/reports",
  "upload": "/reports",
  "result": "/reports",
  "test": "/reports",

  // 💪 Fitness Planner
  "fitness": "/fitness",
  "workout": "/fitness",
  "exercise": "/fitness",
  "training": "/fitness",
  "yoga": "/fitness",

  // 🤖 Chat Assistant
  "chat": "/chat",
  "assistant": "/chat",
  "ai": "/chat",
  "virtual": "/chat",
  "help": "/chat",

  // 🥗 Diet Planner
  "planner": "/diet-planner",
  "plan": "/diet-planner",
  "diet": "/diet-planner",
  "nutrition": "/diet-planner",
  "meal": "/diet-planner",
  "food": "/diet-planner",
  "calories": "/diet-planner",
  "eat": "/diet-planner",

  // 💼 Services
  "services": "/services",
  "packages": "/services",
  "offers": "/services",

  // ℹ️ About
  "about": "/about",
  "team": "/about",
  "mission": "/about",
  "company": "/about",

  // 👥 Community
  "community": "/community",
  "forum": "/community",
  "discussions": "/community",
  "members": "/community",
  "support": "/community",

  // 🔔 Notifications
  "notifications": "/notifications",
  "notification": "/notifications",
  "alerts": "/notifications",
  "alert": "/notifications",
  "reminders": "/notifications",
  "reminder": "/notifications",
  "updates": "/notifications",
  "update": "/notifications",
  
  // 🧭 Dashboard
  "dashboard": "/dashboard",
  "main": "/dashboard",
  "overview": "/dashboard",
  "start": "/dashboard",


};

// ✅ Improved fuzzy matching logic
export const findPage = (query) => {
  if (!query) return null;
  const normalized = query.toLowerCase().trim();

  // 1️⃣ Exact match
  if (PageMappings[normalized]) return PageMappings[normalized];

  // 2️⃣ Single-letter shortcuts
  if (normalized.length === 1) {
    const firstLetterMatches = {
      a: "/about",
      b: "/dashboard",
      c: "/community",
      d: "/find-doctors",
      e: "/fitness",
      f: "/fitness",
      h: "/help",
      i: "/symptom-checker",
      l: "/reports",
      m: "/dashboard",
      n: "/notifications",
      
      p: "/privacy-policy",
      r: "/reports",
      s: "/symptom-checker",
      t: "/terms",
   
     
      w: "/fitness",
    };
    return firstLetterMatches[normalized] || null;
  }

  // 3️⃣ Fuzzy match
  let matchedRoute = null;
  let bestMatchLength = 0;

  Object.keys(PageMappings).forEach((key) => {
    if (
      key.includes(normalized) ||
      normalized.includes(key)
    ) {
      if (key.length > bestMatchLength) {
        matchedRoute = PageMappings[key];
        bestMatchLength = key.length;
      }
    }
  });

  return matchedRoute;
};



export default PageMappings;
