import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Brand Section */}
                    <div>
                        <h2 className="text-2xl font-bold">Imbot</h2>
                        <p className="text-gray-400 mt-2">
                            Smart AI chatbot for seamless interactions.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col space-y-2">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <a href="#" className="text-gray-400 hover:text-indigo-400">Home</a>
                        <a href="#" className="text-gray-400 hover:text-indigo-400">Features</a>
                        <a href="#" className="text-gray-400 hover:text-indigo-400">Pricing</a>
                        <a href="#" className="text-gray-400 hover:text-indigo-400">Contact</a>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold">Follow Us</h3>
                        <div className="flex space-x-4 mt-2">
                            <a href="#" className="text-gray-400 hover:text-indigo-400">
                                <i className="fab fa-facebook text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-indigo-400">
                                <i className="fab fa-twitter text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-indigo-400">
                                <i className="fab fa-linkedin text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-indigo-400">
                                <i className="fab fa-github text-xl"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-400">
                    © {new Date().getFullYear()} Imbot. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer
