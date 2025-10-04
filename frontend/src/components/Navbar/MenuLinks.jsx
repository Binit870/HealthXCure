import { 
  FaHome, 
  FaChartBar, 
  FaUserMd, 
  FaStethoscope, 
  FaFileAlt, 
  FaComments, 
  FaUtensils, 
  FaDumbbell, 
  FaSignOutAlt, 
  FaBell
} from "react-icons/fa";

const MenuLinks = [
  { to: "/", label: "Home", icon: FaHome },
  { to: "/dashboard", label: "Dashboard", icon: FaChartBar },
  {to: "/notifications", label: "Notifications", icon: FaBell },
  { to: "/find-doctors", label: "Find Doctor", icon: FaUserMd },
  { to: "/symptom-checker", label: "Diagnosis", icon: FaStethoscope },
  { to: "/reports", label: "Reports", icon: FaFileAlt },
 
  { to: "/chat", label: "Chat With Assistant", icon: FaComments },
  { to: "/diet-planner", label: "Diet Planner", icon: FaUtensils },
  { to: "/fitness", label: "Fitness Planner", icon: FaDumbbell },

  { to: "/logout", label: "Logout", icon: FaSignOutAlt, isLogout: true }
];

export default MenuLinks;
