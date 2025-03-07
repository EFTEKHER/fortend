import React from "react";
import { FaHeartbeat, FaAppleAlt } from "react-icons/fa";

const diabetesData = [
  { Pregnancies: 6, Glucose: 148.0, BloodPressure: 72.0, SkinThickness: 35.0, Insulin: 155.55, BMI: 33.6, DiabetesPedigreeFunction: 0.627, Age: 50, Outcome: 1 },
  { Pregnancies: 1, Glucose: 85.0, BloodPressure: 66.0, SkinThickness: 29.0, Insulin: 155.55, BMI: 26.6, DiabetesPedigreeFunction: 0.351, Age: 31, Outcome: 0 },
  { Pregnancies: 8, Glucose: 183.0, BloodPressure: 64.0, SkinThickness: 29.15, Insulin: 155.55, BMI: 23.3, DiabetesPedigreeFunction: 0.672, Age: 32, Outcome: 1 },
  { Pregnancies: 1, Glucose: 89.0, BloodPressure: 66.0, SkinThickness: 23.0, Insulin: 94.0, BMI: 28.1, DiabetesPedigreeFunction: 0.167, Age: 21, Outcome: 0 },
  { Pregnancies: 0, Glucose: 137.0, BloodPressure: 40.0, SkinThickness: 35.0, Insulin: 168.0, BMI: 43.1, DiabetesPedigreeFunction: 2.288, Age: 33, Outcome: 1 },
];

const dietData = [
  { Glucose: 124.90, Insulin: 9.60, BP_Systolic: 102.73, Cholesterol: 155.44, Triglycerides: 148.35, BMI: 23.61, Diet_Category: "high_carbohydrate_low_protein" },
  { Glucose: 105.85, Insulin: 13.84, BP_Systolic: 119.38, Cholesterol: 174.76, Triglycerides: 124.82, BMI: 25.47, Diet_Category: "high_carbohydrate_low_protein" },
  { Glucose: 129.43, Insulin: 8.66, BP_Systolic: 120.36, Cholesterol: 162.32, Triglycerides: 141.38, BMI: 24.01, Diet_Category: "high_carbohydrate_low_protein" },
  { Glucose: 155.69, Insulin: 12.54, BP_Systolic: 129.45, Cholesterol: 178.08, Triglycerides: 185.74, BMI: 27.55, Diet_Category: "low_carbohydrate_high_protein" },
  { Glucose: 102.98, Insulin: 2.00, BP_Systolic: 92.66, Cholesterol: 191.43, Triglycerides: 213.89, BMI: 32.99, Diet_Category: "high_carbohydrate_low_protein" },
];

const Dataset = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-100 flex flex-col items-center py-12 overflow-auto">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-8 mb-12 overflow-x-auto overflow-y-auto">
        <h1 className="text-3xl font-bold text-blue-800 flex items-center mb-4">
          <FaHeartbeat className="mr-2 text-red-600" /> Diabetes Dataset
        </h1>
        <p className="mb-4 text-gray-700">This dataset includes key medical indicators such as glucose levels, blood pressure, BMI, and insulin levels, helping to identify potential cases of diabetes.</p>
        <table className="w-full border-collapse border border-blue-400">
          <thead>
            <tr className="bg-blue-300 text-white">
              {Object.keys(diabetesData[0]).map((header, index) => (
                <th key={index} className="p-3 border border-blue-400">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {diabetesData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-blue-100">
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="p-3 border border-blue-400">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-8 overflow-x-auto overflow-y-auto">
        <h1 className="text-3xl font-bold text-green-800 flex items-center mb-4">
          <FaAppleAlt className="mr-2 text-red-600" /> Diet Recommendation Dataset
        </h1>
        <p className="mb-4 text-gray-700">This dataset provides dietary recommendations based on key health metrics like glucose levels, insulin levels, and cholesterol.</p>
        <table className="w-full border-collapse border border-green-400">
          <thead>
            <tr className="bg-green-300 text-white">
              {Object.keys(dietData[0]).map((header, index) => (
                <th key={index} className="p-3 border border-green-400">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dietData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-green-100">
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="p-3 border border-green-400">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dataset;
