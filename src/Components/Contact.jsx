import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { BiLogoGmail } from "react-icons/bi";
const Contact = () => {

  return (
    <section className="py-12 px-6" id='contact'>
      <h2 className="text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-center py-4">
        Contact
      </h2>
      
      <p className='text-center text-gray-500'>For any inquiries or support requests, feel free to reach out to us at <a href="mailto:saransuman1757@gmail.com" className='text-white'>saransuman1757@gmail.com</a>. We will get back to you as soon as possible.</p>

      
      <div className="flex justify-center gap-8 py-8">
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <div className="p-2 social-icons">
            <FaLinkedin className="text-3xl hover:text-blue-600 transition duration-300" />
          </div>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <div className="p-2 social-icons">
            <FaInstagram className="text-3xl hover:text-pink-500 transition duration-300" />
          </div>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <div className="p-2 social-icons">
            <FaTwitter className="text-3xl hover:text-blue-400 transition duration-300" />
          </div>
        </a>
    </div>

   
      
    </section>
  );
};

export default Contact;
