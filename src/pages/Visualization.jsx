import React from 'react';
import { FaChartBar, FaTree, FaCogs, FaRobot, FaCog } from 'react-icons/fa';
import Output from '../assets/output.png';
import AdaBoostConfusionMatrix from '../assets/AdaBoost_confusion_matrix.png';
import DecisionTreeConfusionMatrix from '../assets/DecisionTree_confusion_matrix.png';
import GradientBoostingConfusionMatrix from '../assets/GradientBoosting_confusion_matrix.png';
import KNNConfusionMatrix from '../assets//KNN_confusion_matrix.png';
import XGBoostConfusionMatrix from '../assets/XGBoost_confusion_matrix.png';
import RandomForestFeatureImportance from '../assets/RandomForest_confusion_matrix.png';

const Visualization = () => {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-100 p-6 text-gray-800">
      <h1 className="text-center text-4xl glow-text mb-8">Model Performance & Data Insights</h1>
      <div className="bg-gradient-to-r from-blue-300 to-blue-100 rounded-lg p-4 glow-border h-[25%]">
        <img src={Output} alt="Gradient Boosting Confusion Matrix" className="w-full rounded-lg" />
        <p className="text-center mt-2 text-xl flex items-center justify-center">
          <FaCog className="mr-2" /> Testing Accuracy on different models
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-300 to-blue-100 rounded-lg p-4 glow-border">
          <img src={AdaBoostConfusionMatrix} alt="AdaBoost Confusion Matrix" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaChartBar className="mr-2" /> AdaBoost Confusion Matrix
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-300 to-blue-100 rounded-lg p-4 glow-border">
          <img src={DecisionTreeConfusionMatrix} alt="Decision Tree Confusion Matrix" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaTree className="mr-2" /> Decision Tree Confusion Matrix
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-300 to-blue-100 rounded-lg p-4 glow-border">
          <img src={GradientBoostingConfusionMatrix} alt="Gradient Boosting Confusion Matrix" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaCog className="mr-2" /> Gradient Boosting Confusion Matrix
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-300 to-blue-100 rounded-lg p-4 glow-border">
          <img src={KNNConfusionMatrix} alt="KNN Confusion Matrix" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaRobot className="mr-2" /> KNN Confusion Matrix
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-300 to-blue-100 rounded-lg p-4 glow-border">
          <img src={XGBoostConfusionMatrix} alt="XGBoost Confusion Matrix" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaCogs className="mr-2" /> XGBoost Confusion Matrix
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-300 to-blue-100 rounded-lg p-4 glow-border">
          <img src={RandomForestFeatureImportance} alt="Random Forest Feature Importance" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaTree className="mr-2" /> Random Forest Feature Importance
          </p>
        </div>
      </div>
    </div>
  );
}

export default Visualization;
