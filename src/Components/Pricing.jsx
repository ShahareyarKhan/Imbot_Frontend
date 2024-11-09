import React from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const container = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="py-12 px-6" id='pricing'>
      <h2 className="text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-center mb-8 py-8">
        Pricing
      </h2>

      <motion.div
        className="pricing-section"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            <motion.div
              variants={item}
              className="p-6 shadow-lg border border-gray-300  rounded-lg w-full"
            >
              <h3 className="text-2xl font-semibold mb-4 text-center">Basic Plan</h3>
              <p className="text-xl font-bold text-center mb-2">Free</p>
              <p className="text-gray-600 text-center mb-4">Access to all basic features.</p>
              <ul className="text-gray-600">
                <li>🌟 User-Friendly Interface</li>
                <li>🌟 PDF-Based Chatbot Training</li>
                <li>🌟 Customizable Chatbots</li>
              </ul>
              <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500">Get Started</button>
            </motion.div>

            <motion.div
              variants={item}
              className="p-6 shadow-lg border border-gray-300  rounded-lg w-full"
            >
              <h3 className="text-2xl font-semibold mb-4 text-center">Standard Plan</h3>
              <p className="text-xl font-bold text-center mb-2">Free</p>
              <p className="text-gray-600 text-center mb-4">Includes everything in Basic plus more.</p>
              <ul className="text-gray-600">
                <li>🌟 Embed Anywhere</li>
                <li>🌟 Scalable User Accounts</li>
                <li>🌟 Secure Data Handling</li>
              </ul>
              <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500">Get Started</button>
            </motion.div>

            <motion.div
              variants={item}
              className="p-6 shadow-lg border border-gray-300  rounded-lg w-full"
            >
              <h3 className="text-2xl font-semibold mb-4 text-center">Premium Plan</h3>
              <p className="text-xl font-bold text-center mb-2">Free</p>
              <p className="text-gray-600 text-center mb-4">All features included for advanced users.</p>
              <ul className="text-gray-600">
                <li>🌟 Advanced AI Capabilities</li>
                <li>🌟 Responsive Design</li>
                <li>🌟 Bot Sharing</li>
              </ul>
              <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500">Get Started</button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Pricing;
