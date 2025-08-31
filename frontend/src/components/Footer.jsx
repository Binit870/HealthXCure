import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center md:text-left">
                <div>
                    <h4 className="text-2xl font-bold text-gradient mb-4">HealthHub</h4>
                    <p className="text-sm text-gray-400">Your all-in-one platform for managing health and well-being.</p>
                    <div className="mt-4 flex justify-center md:justify-start space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition duration-200"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-200"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-200"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-200"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div>
                    <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#services" className="hover:text-white transition duration-200">Services</a></li>
                        <li><a href="#doctors" className="hover:text-white transition duration-200">Doctors</a></li>
                        <li><a href="#reports" className="hover:text-white transition duration-200">Reports</a></li>
                        <li><a href="#blog" className="hover:text-white transition duration-200">Blog</a></li>
                        <li><a href="#community" className="hover:text-white transition duration-200">Community</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xl font-bold mb-4">Support</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition duration-200">FAQ</a></li>
                        <li><a href="#" className="hover:text-white transition duration-200">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition duration-200">Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xl font-bold mb-4">Contact Us</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><i className="fas fa-map-marker-alt mr-2"></i> 123 Health Ave, Wellness City</li>
                        <li><i className="fas fa-envelope mr-2"></i> support@healthhub.com</li>
                        <li><i className="fas fa-phone mr-2"></i> (123) 456-7890</li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                <p className="text-sm text-gray-500">&copy; 2024 HealthHub. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
