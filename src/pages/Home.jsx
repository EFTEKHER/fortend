import React from 'react';
import { FaRobot, FaChartLine, FaUtensils, FaClipboardList } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
        Manage Your Diabetes with Ease
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl">
        Explore our tools to predict your health, get personalized diet recommendations, and chat with our AI assistant for more insights.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {/* Chatbot Button */}
        <Link to="/chatbot">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:shadow-xl transition-shadow"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaRobot className="text-6xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Chatbot</h2>
            <p className="text-gray-600 text-center">
              Interact with our AI assistant to get answers to your diabetes-related questions.
            </p>
          </motion.div>
        </Link>

        {/* Predict Button */}
        <Link to="/predict">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:shadow-xl transition-shadow"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaChartLine className="text-6xl text-green-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Predict</h2>
            <p className="text-gray-600 text-center">
              Predict your health status based on your current metrics and lifestyle.
            </p>
          </motion.div>
        </Link>

        {/* Recommend Button */}
        <Link to="/recommendation">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:shadow-xl transition-shadow"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaUtensils className="text-6xl text-purple-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Recommend</h2>
            <p className="text-gray-600 text-center">
              Get personalized diet recommendations tailored to your health needs.
            </p>
          </motion.div>
        </Link>

        {/* View Reports Button */}
        <Link to="/view_all_reports">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:shadow-xl transition-shadow"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaClipboardList className="text-6xl text-orange-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">View Reports</h2>
            <p className="text-gray-600 text-center">
              Access all medical reports and historical data in one place.
            </p>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Home;