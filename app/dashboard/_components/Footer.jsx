"use client";
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="relative bg-gray-100 text-gray-800 py-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <svg
          className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4"
          width="600"
          height="600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="300" cy="300" r="250" fill="rgba(255, 255, 255, 0.1)" />
        </svg>
        <svg
          className="absolute bottom-0 right-0 -translate-x-1/4 translate-y-1/4"
          width="600"
          height="600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="300" cy="300" r="250" fill="rgba(0, 255, 255, 0.1)" />
        </svg>
      </div>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 lg:mb-16">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-900">
              Connect with Us
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Stay in touch with us through social media or reach out for more information.
            </p>
            <div className="flex justify-center lg:justify-start space-x-6 mb-8 lg:mb-0">
              <a href="https://github.com/MrtitaniumJ" aria-label="Facebook" className="transition-transform transform hover:scale-110">
                <FaGithub className="text-3xl text-gray-800 hover:text-black" />
              </a>
              <a href="https://x.com/jksharma_jatin" aria-label="Twitter" className="transition-transform transform hover:scale-110">
                <FaTwitter className="text-3xl text-gray-800 hover:text-blue-400" />
              </a>
              <a href="https://www.linkedin.com/in/jatin-sharma-82121217a/" aria-label="LinkedIn" className="transition-transform transform hover:scale-110">
                <FaLinkedinIn className="text-3xl text-gray-800 hover:text-blue-600" />
              </a>
              <a href="https://www.instagram.com/then_its_mr.j/" aria-label="Instagram" className="transition-transform transform hover:scale-110">
                <FaInstagram className="text-3xl text-gray-800 hover:text-pink-500" />
              </a>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <Button
              size="lg"
              variant="primary"
              className="bg-white text-gray-900 hover:bg-gray-200 py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
              onClick={() => alert('Contact feature coming soon!')}
            >
              Contact Us
            </Button>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-6 text-center">
          <p className="text-gray-800 text-sm">
            © {new Date().getFullYear()} nexStep.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
