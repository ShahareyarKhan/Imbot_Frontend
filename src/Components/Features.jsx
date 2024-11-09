import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
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
    <section id="features">
      <h2 className="text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-center mb-8">
        Features
      </h2>

      <motion.div
        className="features-section  px-6 pb-12"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {[
              { title: "User-Friendly Interface", description: "Easily create and manage your own account to build customized chatbots with a seamless and intuitive interface." },
              { title: "PDF-Based Chatbot Training", description: "Upload your PDF documents to train personalized chatbots, providing accurate responses based on the document's content." },
              { title: "Customizable Chatbots", description: "Design and modify chatbots to suit your needs, ensuring they respond in ways that best fit your requirements." },
              { title: "Embed Anywhere", description: "Easily generate embed links to place your chatbots on resumes, portfolios, and other platforms." },
              { title: "Scalable User Accounts", description: "Create multiple chatbots under a single account, making it easy to manage different bots for various purposes." },
              { title: "Secure Data Handling", description: "Your PDFs and chatbot data are securely handled with encryption, ensuring privacy and protection." },
              { title: "Advanced AI Capabilities", description: "Powered by advanced Natural Language Processing (NLP), your chatbots provide intelligent, context-aware responses." },
              { title: "Responsive Design", description: "The platform is fully responsive and works seamlessly across desktops, tablets, and smartphones." },
              { title: "Bot Sharing", description: "Share your chatbot with others via direct links, allowing them to interact for demonstration or collaboration." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 shadow-lg border-b border-gray-600  w-full"
                variants={item}
              >
                <h3 className="text-xl font-semibold mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
