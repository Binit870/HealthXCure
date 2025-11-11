import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
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
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Services</h4>
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
              <Link to="/report-analysis" className="hover:text-teal-600 flex items-center space-x-2">
                <FaFileMedicalAlt className="text-teal-500" />
                <span>Report Analysis</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Company</h4>
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
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Legal</h4>
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

          <h4 className="text-lg font-semibold mb-3 text-gray-800">Follow Us</h4>
          <div className="flex space-x-4">
            <Link
              to="/facebook"
              className="p-2 bg-teal-50 rounded-full hover:bg-teal-100 transition"
            >
              <FaFacebookF className="text-teal-600" />
            </Link>
            <Link
              to="/twitter"
              className="p-2 bg-teal-50 rounded-full hover:bg-teal-100 transition"
            >
              <FaTwitter className="text-teal-600" />
            </Link>
            <Link
              to="/instagram"
              className="p-2 bg-teal-50 rounded-full hover:bg-teal-100 transition"
            >
              <FaInstagram className="text-teal-600" />
            </Link>
            <Link
              to="/linkedin"
              className="p-2 bg-teal-50 rounded-full hover:bg-teal-100 transition"
            >
              <FaLinkedinIn className="text-teal-600" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center border-t border-gray-200 pt-6 text-sm text-gray-500">
        © 2025 HealthXCure. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
