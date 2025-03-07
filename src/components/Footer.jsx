import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Diabetes Diet Recommendation AI System</h3>
            <p className="text-gray-400">
              Empowering individuals with AI-driven diabetes management solutions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/predict" className="text-gray-400 hover:text-white">Prediction</a></li>
              <li><a href="/recommendation" className="text-gray-400 hover:text-white">Diet Recommendations</a></li>
              <li><a href="/workflow" className="text-gray-400 hover:text-white">ML Workflow</a></li>
              <li><a href="/visualization" className="text-gray-400 hover:text-white">Data Visualization</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/Tusher2859" className="text-gray-400 hover:text-white">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/mazharul-islam-tusher-431822b2" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Diabetes Diet Recommendation AI System made by Mazharul Islam Tusher. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;