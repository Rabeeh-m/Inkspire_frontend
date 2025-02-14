import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from- bg-gray-900 to-bg-gray-800 text-white py-8">
            <div className="container mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Brand Section */}
                    <div>
                        <h2 className="text-2xl font-bold">Inkspire</h2>
                        <p className="mt-2 text-sm text-gray-300">
                            Unleash your creativity and share your thoughts with the world.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
                            <li><a href="/blog" className="hover:text-gray-300">Blog</a></li>
                            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
                            <li><a href="/privacy" className="hover:text-gray-300">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold">Follow Us</h3>
                        <div className="flex justify-center md:justify-start gap-4 mt-3">
                            <a href="#" className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30">
                                <FaFacebookF size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30">
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30">
                                <FaInstagram size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30">
                                <FaLinkedinIn size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 text-center text-sm text-gray-300 border-t border-gray-500 pt-4">
                    &copy; {new Date().getFullYear()} Inkspire. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
