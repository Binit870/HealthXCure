import React from "react";
import { Link } from "react-router-dom";
import {

  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaStethoscope,
  FaUserMd,
  FaAppleAlt,
  FaFileMedicalAlt,
  FaInfoCircle,
  FaEnvelopeOpenText,
  FaQuestionCircle,
  FaHandsHelping,
  FaShieldAlt,
  FaFileContract,
} from "react-icons/fa";
import { IoFitnessOutline } from "react-icons/io5";
import { SiX } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 py-12 border-t border-gray-200">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h4 className="text-2xl font-bold text-teal-600 mb-3 flex items-center space-x-2">
            <IoFitnessOutline className="text-teal-600" />
            <span>HealthXCure</span>
          </h4>
          <p className="text-sm leading-relaxed">
            Your trusted partner in health and wellness. Providing comprehensive
            healthcare solutions powered by AI.
          </p>
        </div>

        {/* Services Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-teal-800">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/symptom-checker" className="hover:text-teal-600 flex items-center space-x-2">
                <FaStethoscope className="text-teal-500" />
                <span>Symptom Checker</span>
              </Link>
            </li>
            <li>
              <Link to="/find-doctors" className="hover:text-teal-600 flex items-center space-x-2">
                <FaUserMd className="text-teal-500" />
                <span>Find Doctors</span>
              </Link>
            </li>
            <li>
              <Link to="/diet-planner" className="hover:text-teal-600 flex items-center space-x-2">
                <FaAppleAlt className="text-teal-500" />
                <span>Diet Planner</span>
              </Link>
            </li>
            <li>
              <Link to="/reports" className="hover:text-teal-600 flex items-center space-x-2">
                <FaFileMedicalAlt className="text-teal-500" />
                <span>Report Analysis</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-teal-800">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-teal-600 flex items-center space-x-2">
                <FaInfoCircle className="text-teal-500" />
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-teal-600 flex items-center space-x-2">
                <FaEnvelopeOpenText className="text-teal-500" />
                <span>Contact</span>
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-teal-600 flex items-center space-x-2">
                <FaQuestionCircle className="text-teal-500" />
                <span>FAQ</span>
              </Link>
            </li>
            <li>
              <Link to="/help-center" className="hover:text-teal-600 flex items-center space-x-2">
                <FaHandsHelping className="text-teal-500" />
                <span>Help Center</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal + Socials Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-teal-800">Legal</h4>
          <ul className="space-y-2 text-sm mb-6">
            <li>
              <Link to="/privacy-policy" className="hover:text-teal-600 flex items-center space-x-2">
                <FaShieldAlt className="text-teal-500" />
                <span>Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-teal-600 flex items-center space-x-2">
                <FaFileContract className="text-teal-500" />
                <span>Terms of Service</span>
              </Link>
            </li>
          </ul>

          <h4 className="text-lg font-semibold mb-3 text-teal-800">Follow Us</h4>
          <div className="flex text-2xl space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=61581851285563"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-transform transform hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/healthcure775/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-transform transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/healthcure-jamshedpur-2994a8389/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition-transform transform hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/HealthCure59238"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-transform transform hover:scale-110"
            >
              <SiX/>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-6 text-center border-t border-gray-200 pt-4 text-2xl  text-teal-800">
        © 2025 HealthXCure. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
