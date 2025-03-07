import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRobot, FaHeartbeat, FaLightbulb, FaRegChartBar, FaAppleAlt, FaClinicMedical, FaRocket } from 'react-icons/fa';
import { GiMeal } from 'react-icons/gi';
import CountUp from 'react-countup';
import { IoAnalytics, IoNutrition } from 'react-icons/io5';

const PatientHome = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3, duration: 0.8 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const featureCards = [
    { icon: <FaHeartbeat className="w-12 h-12" />, title: "Personalized Insights", text: "AI-powered analysis of your health metrics" },
    { icon: <IoNutrition className="w-12 h-12" />, title: "Smart Diet Plans", text: "ML-generated nutrition recommendations" },
    { icon: <FaClinicMedical className="w-12 h-12" />, title: "Health Monitoring", text: "Continuous tracking of vital parameters" }
  ];

  const steps = [
    { icon: <FaRegChartBar />, title: "Data Analysis", text: "Advanced algorithms process your health data" },
    { icon: <IoAnalytics />, title: "Pattern Recognition", text: "Identify dietary needs and risk factors" },
    { icon: <GiMeal />, title: "Diet Generation", text: "Create personalized meal plans" }
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <FaRocket className="text-6xl text-purple-600 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            AI-Powered Diabetes Management
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Leveraging machine learning to provide personalized diet recommendations and health insights
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {featureCards.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-purple-600 mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Statistics Section */}
        <motion.div
          className="bg-purple-600 text-white rounded-2xl p-8 mb-20 shadow-xl"
          variants={itemVariants}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">
                <CountUp end={95} duration={2} suffix="%" />
              </div>
              <div className="text-sm">Prediction Accuracy</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">
                <CountUp end={10000} duration={2} suffix="+" />
              </div>
              <div className="text-sm">Successful Recommendations</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">
                <CountUp end={24} duration={2} suffix="/7" />
              </div>
              <div className="text-sm">Health Monitoring</div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div className="mb-20" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg"
                whileHover={{ y: -10 }}
              >
                <div className="text-purple-600 text-3xl mb-4">{step.icon}</div>
                <div className="text-xl font-semibold text-gray-800 mb-2">{step.title}</div>
                <p className="text-gray-600">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Corrected Chatbot Section */}
        <motion.div
          className="text-center"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <Link to="/chatbot" className="inline-block w-full">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105 cursor-pointer">
              <div className="animate-float">
                <FaRobot className="text-6xl mx-auto mb-4" />
              </div>
              <h2 className="text-3xl font-bold mb-4">AI Health Assistant</h2>
              <p className="text-lg mb-4">Get instant answers to your health questions</p>
              <div className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all inline-block">
                Start Chatting
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ML Explanation */}
        <motion.div className="mt-20 bg-white rounded-2xl p-8 shadow-lg" variants={itemVariants}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <FaLightbulb className="text-5xl text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Advanced Machine Learning Model</h3>
              <p className="text-gray-600">
                Our system uses deep neural networks trained on millions of data points to predict
                glucose responses and generate optimal diet plans. The model continuously learns
                from new data to improve recommendations.
              </p>
            </div>
            <div className="flex-1">
              <FaAppleAlt className="text-5xl text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Personalized Nutrition</h3>
              <p className="text-gray-600">
                The algorithm considers your medical history, preferences, and lifestyle to create
                customized meal plans that help maintain healthy blood sugar levels.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PatientHome;