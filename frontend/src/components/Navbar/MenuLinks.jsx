import { 
  FaHome, 
  FaChartBar, 
  FaUserMd, 
  FaStethoscope, 
  FaFileMedicalAlt, 
  FaComments, 
  FaAppleAlt, 
  FaRunning, 
  FaSignOutAlt 
} from "react-icons/fa";

const MenuLinks = [
  { to: "/", label: "Home", icon: FaHome },
  { to: "/dashboard", label: "Dashboard", icon: FaChartBar },
  { to: "/find-doctors", label: "Find Doctors", icon: FaUserMd },
  { to: "/symptom-checker", label: "Symptica", icon: FaStethoscope },
  { to: "/reports", label: "Health Reports", icon: FaFileMedicalAlt }, // ✅ Better icon + name
  { to: "/chat", label: "Chat with Cura", icon: FaComments },
  { to: "/diet-planner", label: "Diet Buddy", icon: FaAppleAlt }, // 🍎 More fitting icon
  { to: "/fitness", label: "MetricFit Planner", icon: FaRunning }, // 🏃‍♂️ Better name + icon
  { to: "/logout", label: "Logout", icon: FaSignOutAlt, isLogout: true }
];

export default MenuLinks;
