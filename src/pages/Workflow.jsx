import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaDatabase,
  FaChartLine,
  FaCogs,
  FaUtensils,
  FaHeartbeat,
  FaSearch,
  FaFileMedical
} from "react-icons/fa";
import {
  GiProcessor,
  GiArtificialIntelligence,
} from "react-icons/gi";
import {
  MdOutlineDataThresholding,
  MdOutlineModelTraining,
  MdPrecisionManufacturing,
} from "react-icons/md";
import { SiScikitlearn } from "react-icons/si";

const workflowSteps = [
  {
    icon: <FaDatabase className="text-blue-600 text-5xl" />,
    title: "Diabetes Dataset",
    description: "The dataset includes Glucose, Blood Pressure, BMI, Insulin, and more, labeled as Diabetic or Non-Diabetic.",
  },
  {
    icon: <FaHeartbeat className="text-red-500 text-5xl animate-pulse" />,
    title: "Handling Missing Values",
    description: "Missing values are replaced with mean/median or dropped if necessary to maintain data integrity.",
  },
  {
    icon: <MdOutlineDataThresholding className="text-green-500 text-5xl" />,
    title: "Encoding Categorical Values",
    description: "Label Encoding & One-Hot Encoding are used to convert categorical features into numerical format.",
  },
  {
    icon: <GiProcessor className="text-purple-500 text-5xl" />,
    title: "Feature Scaling",
    description: "Standardization, MinMax Scaling, and Robust Scaling are applied to normalize the dataset.",
  },
  {
    icon: <FaChartLine className="text-blue-500 text-5xl" />,
    title: "Feature Selection",
    description: "All available features are selected for training the machine learning models.",
  },
  {
    icon: <FaCogs className="text-pink-500 text-5xl" />,
    title: "Train-Test Split (80:20)",
    description: "The dataset is split into 80% training and 20% testing for model validation.",
  },
  {
    icon: <SiScikitlearn className="text-indigo-500 text-5xl" />,
    title: "Hyperparameter Tuning",
    description: "RandomSearchCV & GridSearchCV are used to find the best hyperparameters for multiple models.",
  },
  {
    icon: <MdOutlineModelTraining className="text-teal-500 text-5xl" />,
    title: "Model Training",
    description: "Models (KNN, AdaBoost, XGBoost, Random Forest, etc.) are trained using the best hyperparameters.",
  },
  {
    icon: <GiArtificialIntelligence className="text-orange-500 text-5xl" />,
    title: "Prediction & Classification",
    description: "Trained models predict if a patient is Diabetic or Non-Diabetic based on input features.",
  },
  {
    icon: <FaUtensils className="text-green-500 text-5xl" />,
    title: "Diet Recommendation",
    description: "Based on predictions, a personalized diet plan is recommended for maintaining a healthy lifestyle.",
  },
];

const Workflow = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold text-blue-600 mb-6 flex items-center justify-center">
          <FaHeartbeat className="mr-3 text-5xl text-red-500 animate-pulse" />
          Diabetes Prediction & Diet Workflow
        </h1>
        <p className="text-gray-600 text-lg mb-12">
          This workflow outlines the steps for data preprocessing, model training, and personalized diet recommendations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition transform hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h2 className="text-xl font-bold text-blue-500 text-center mb-2">{step.title}</h2>
              <p className="text-gray-700 text-center">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Final Prediction & Recommendation */}
        <motion.div
          className="mt-12 p-6 bg-white border border-gray-300 rounded-lg text-center shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-blue-600 flex items-center justify-center">
            <MdPrecisionManufacturing className="mr-3 text-5xl text-indigo-500 animate-spin-slow" />
            Final Prediction & Diet Recommendation
          </h2>
          <p className="text-gray-700 text-lg mt-4">
            The trained models predict whether a patient is{" "}
            <span className="text-green-500 font-bold">Non-Diabetic</span> or{" "}
            <span className="text-red-500 font-bold">Diabetic</span> and provide personalized diet recommendations.
          </p>

          {/* Buttons for Prediction, Recommendation & Medical Report */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
            <motion.button
              className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition transform hover:scale-105 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/predict" className="flex items-center">
                <FaSearch className="mr-2 text-lg" />
                Get Prediction
              </Link>
            </motion.button>

            <motion.button
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-700 transition transform hover:scale-105 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/recommendation" className="flex items-center">
                <FaUtensils className="mr-2 text-lg" />
                Get Diet Recommendation
              </Link>
            </motion.button>

            <motion.button
              className="px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-700 transition transform hover:scale-105 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/medical_report" className="flex items-center">
                <FaFileMedical className="mr-2 text-lg" />
                Create Patient's Medical Report
              </Link>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Workflow;
