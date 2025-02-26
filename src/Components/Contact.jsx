import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { CgWebsite } from "react-icons/cg";
const Contact = () => {

  return (
    <section className="py-12 px-6" id='contact'>
      <h2 className="text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-center py-4">
        Contact
      </h2>

      <p className='text-center text-gray-500'>For any inquiries or support requests, feel free to reach out to us at <a href="mailto:shahareyar2003@gmail.com" className='text-white'>shahareyar2003@gmail.com</a>. We will get back to you as soon as possible.</p>

      <div className="flex justify-center gap-8 py-8">
        <a href="https://www.linkedin.com/in/shahareyarkhan/" target="_blank" rel="noopener noreferrer" className="bg-white p-1 rounded-full">
          <div className="p-1 social-icons">
            <FaLinkedin className="text-3xl  text-blue-700 hover:text-blue-600 transition duration-300" />
          </div>
        </a>
        <a href="https://www.instagram.com/_shahareyar_/" target="_blank" rel="noopener noreferrer" className="bg-white p-1 rounded-full">
          <div className="p-1 social-icons">
            <FaInstagram className="text-3xl text-pink-600 hover:text-pink-500 transition duration-300" />
          </div>
        </a>
        <a href="https://x.com/shahareyar2003" target="_blank" rel="noopener noreferrer" className="bg-white p-1 rounded-full">
          <div className="p-1 social-icons">
            <FaTwitter className="text-3xl text-cyan-500 hover:text-cyan-400 transition duration-300" />
          </div>
        </a>
        <a href="https://shahareyar-anjum.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-white p-1 rounded-full">
          <div className="p-1 social-icons">
            <CgWebsite className="text-3xl text-gray-700 hover:text-gray-800 transition duration-300" />
          </div>
        </a>
      </div>

    </section>
  );
};

export default Contact;
