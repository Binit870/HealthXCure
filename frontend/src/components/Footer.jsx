import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaInfoCircle,
  FaHandsHelping,
  FaUsers,
  FaQuestionCircle,
  FaShieldAlt,
  FaFileContract,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 text-center md:text-left">
        {/* Brand */}
        <div>
          <h4 className="text-2xl font-bold text-gradient mb-4">HealthXCure</h4>
          <p className="text-sm">
            Your all-in-one platform for managing health and well-being.
          </p>
          <div className="mt-5 flex justify-center md:justify-start space-x-4">
            <a
  href="https://www.facebook.com/profile.php?id=61581851285563"
  target="_blank"
  rel="noopener noreferrer"
  className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition duration-300"
><FaFacebookF />
</a>

              
            
            <a
  href="https://x.com/HealthCure59238"
  target="_blank"
  rel="noopener noreferrer"
  className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition duration-300"
>
  <FaTwitter />
</a>
              
            
            <a
  href="https://www.instagram.com/healthcure775/"
  target="_blank"
  rel="noopener noreferrer"
  className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition duration-300"
>
  <FaInstagram />
</a>
              
            
            <a
  href="https://www.linkedin.com/in/healthcure-jamshedpur-2994a8389/"
  target="_blank"
  rel="noopener noreferrer"
  className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition duration-300"
>
 <FaLinkedinIn />
</a>
              
            
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 justify-center md:justify-start">
              <FaInfoCircle className="text-pink-500" />
              <Link
                to="/about"
                className="hover:text-white transition duration-200"
              >
                About
              </Link>
            </li>
            <li className="flex items-center space-x-2 justify-center md:justify-start">
              <FaHandsHelping className="text-pink-500" />
              <Link
                to="/help"
                className="hover:text-white transition duration-200"
              >
                Help-center
              </Link>
            </li>
            <li className="flex items-center space-x-2 justify-center md:justify-start">
              <FaUsers className="text-pink-500" />
              <Link
                to="/community"
                className="hover:text-white transition duration-200"
              >
                Community
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 justify-center md:justify-start">
              <FaQuestionCircle className="text-pink-500" />
              <Link to="/faq" className="hover:text-white transition duration-200">
                FAQ
              </Link>
            </li>
            <li className="flex items-center space-x-2 justify-center md:justify-start">
              <FaShieldAlt className="text-pink-500" />
              <Link
                to="/privacy-policy"
                className="hover:text-white transition duration-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="flex items-center space-x-2 justify-center md:justify-start">
              <FaFileContract className="text-pink-500" />
              <Link
                to="/terms"
                className="hover:text-white transition duration-200"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center md:justify-start space-x-2">
              <FaMapMarkerAlt className="text-pink-500" />
              <span>123 Health Ave, Wellness City</span>
            </li>
            <li className="flex items-center justify-center md:justify-start space-x-2">
              <FaEnvelope className="text-pink-500" />
              <span>support@healthcure.com</span>
            </li>
            <li className="flex items-center justify-center md:justify-start space-x-2">
              <FaPhone className="text-pink-500" />
              <span>+91 123-456-7890</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 py-6 text-center">
        <p className="text-sm text-gray-500">
          &copy; 2025 HealthXCure. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
